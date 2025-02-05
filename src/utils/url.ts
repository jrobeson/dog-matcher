export const extractFromParam = (page: string): string | null => {
    try {
      // Use a base URL to parse the cursor string
      const url = new URL(page, "https://frontend-take-home-service.fetch.com");
      return url.searchParams.get("from");
    } catch (error) {
      console.error('Error extracting "from" parameter:', error);
      return null;
    }
  };