const Testimonial = () => {
  return (
    <section className="bg-parascape-green/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <svg
            className="mx-auto mb-6 h-12 w-12 text-parascape-green"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="mb-8 text-xl text-gray-700 md:text-2xl">
            "Parascape transformed our online presence completely. Their team understood our local
            market and created a website that perfectly represents our brand. We've seen a
            significant increase in customer engagement since launching."
          </p>
          <div className="font-medium text-gray-900">
            <p className="text-parascape-green">Sarah Johnson</p>
            <p className="text-sm text-gray-500">Owner, Local Cafe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
