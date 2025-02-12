async function submitSitemapToSearchEngines(sitemapUrl: string) {
  const searchEngines = [
    `http://www.google.com/ping?sitemap=${sitemapUrl}`,
    `http://www.bing.com/ping?sitemap=${sitemapUrl}`
  ];

  try {
    const results = await Promise.all(
      searchEngines.map(async (engine) => {
        const response = await fetch(engine);
        return {
          engine,
          status: response.status,
          ok: response.ok
        };
      })
    );

    results.forEach(({ engine, status, ok }) => {
      console.log(`Submitted sitemap to ${engine}: ${ok ? 'Success' : 'Failed'} (${status})`);
    });
  } catch (error) {
    console.error('Error submitting sitemaps:', error);
  }
}

export { submitSitemapToSearchEngines }; 