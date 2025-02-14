create extension if not exists "pg_net" with schema "public" version '0.14.0';

drop trigger if exists "handle_contact_email_trigger" on "public"."contact_submissions";

create table "public"."contacts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "email" text,
    "phone" text,
    "type" text,
    "status" text,
    "notes" text
);


alter table "public"."contacts" enable row level security;

CREATE UNIQUE INDEX contacts_pkey ON public.contacts USING btree (id);

alter table "public"."contacts" add constraint "contacts_pkey" PRIMARY KEY using index "contacts_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_contact_submission(p_name text, p_email text, p_phone text, p_message text, p_type text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_submission_id UUID;
    v_edge_function_response JSON;
    v_project_ref TEXT := 'hpuqzerpfylevdfwembv';
BEGIN
    -- Insert the submission first
    INSERT INTO contact_submissions (name, email, phone, message, type)
    VALUES (p_name, p_email, p_phone, p_message, p_type)
    RETURNING id INTO v_submission_id;

    -- Call the Edge Function using pg_net
    SELECT content::json INTO v_edge_function_response
    FROM net.http_post(
        url:='https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-email',
        headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', format('Bearer %s', current_setting('secrets.service_role_key'))
        ),
        body:=jsonb_build_object(
            'name', p_name,
            'email', p_email,
            'phone', p_phone,
            'message', p_message,
            'type', p_type
        )
    );

    -- Update submission status based on Edge Function response
    UPDATE contact_submissions
    SET 
        status = CASE 
            WHEN v_edge_function_response->>'success' = 'true' THEN 'processed'
            ELSE 'failed'
        END,
        email_sent = (v_edge_function_response->>'success')::boolean,
        email_sent_at = CASE 
            WHEN v_edge_function_response->>'success' = 'true' THEN NOW()
            ELSE NULL
        END,
        error_message = v_edge_function_response->>'error'
    WHERE id = v_submission_id;

    RETURN v_edge_function_response;
EXCEPTION
    WHEN OTHERS THEN
        -- Update submission status on error
        IF v_submission_id IS NOT NULL THEN
            UPDATE contact_submissions
            SET 
                status = 'failed',
                error_message = SQLERRM
            WHERE id = v_submission_id;
        END IF;
        
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_new_submission()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    PERFORM net.http_post(
        'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email',
        jsonb_build_object(
            'record', jsonb_build_object(
                'id', NEW.id,
                'created_at', NEW.created_at,
                'name', NEW.name,
                'email', NEW.email,
                'phone', NEW.phone,
                'message', NEW.message,
                'type', NEW.type,
                'status', NEW.status
            )
        ),
        jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTM5NzgsImV4cCI6MjAyNTQyOTk3OH0.7z1LBl-9EbHnXEF9Kc8ljrF6c3EhKNj_lBCqk-YNSMs'
        )
    );
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."contact_submissions" to "anon";

grant references on table "public"."contact_submissions" to "anon";

grant select on table "public"."contact_submissions" to "anon";

grant trigger on table "public"."contact_submissions" to "anon";

grant truncate on table "public"."contact_submissions" to "anon";

grant update on table "public"."contact_submissions" to "anon";

grant delete on table "public"."contact_submissions" to "authenticated";

grant references on table "public"."contact_submissions" to "authenticated";

grant trigger on table "public"."contact_submissions" to "authenticated";

grant truncate on table "public"."contact_submissions" to "authenticated";

grant update on table "public"."contact_submissions" to "authenticated";

grant delete on table "public"."contacts" to "anon";

grant insert on table "public"."contacts" to "anon";

grant references on table "public"."contacts" to "anon";

grant select on table "public"."contacts" to "anon";

grant trigger on table "public"."contacts" to "anon";

grant truncate on table "public"."contacts" to "anon";

grant update on table "public"."contacts" to "anon";

grant delete on table "public"."contacts" to "authenticated";

grant insert on table "public"."contacts" to "authenticated";

grant references on table "public"."contacts" to "authenticated";

grant select on table "public"."contacts" to "authenticated";

grant trigger on table "public"."contacts" to "authenticated";

grant truncate on table "public"."contacts" to "authenticated";

grant update on table "public"."contacts" to "authenticated";

grant delete on table "public"."contacts" to "service_role";

grant insert on table "public"."contacts" to "service_role";

grant references on table "public"."contacts" to "service_role";

grant select on table "public"."contacts" to "service_role";

grant trigger on table "public"."contacts" to "service_role";

grant truncate on table "public"."contacts" to "service_role";

grant update on table "public"."contacts" to "service_role";


