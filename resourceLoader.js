const loadResources = {
  loadJS: function (url, async = true, defer = true) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = async;
      script.defer = defer;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.head.appendChild(script);
    });
  },

  loadCSS: function (url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
      document.head.appendChild(link);
    });
  },

  loadMultipleResources: async function (resources) {
    const promises = resources.map((resourceUrl) => {
      const ext = resourceUrl.split(".").pop();
      if (ext === "js") {
        return this.loadJS(resourceUrl);
      } else if (ext === "css") {
        return this.loadCSS(resourceUrl);
      }
      return Promise.reject(
        new Error(`Unknown resource type: ${ext}`)
      );
    });

    try {
      await Promise.all(promises);
      console.log("All resources loaded successfully");
    } catch (error) {
      console.error("Error loading resources:", error);
    }
  },
};

export default loadResources;