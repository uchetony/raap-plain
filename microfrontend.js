import loadResources from "./resourceLoader.js";

function LoadMicrofrontend() {
  window.isMicroFrontend = true;
  const host = "https://raap-react.netlify.app"
  const cacheBust = `v=${new Date().getTime()}`;

  fetch(`${host}/asset-manifest.json?${cacheBust}`)
    .then((res) => res.json())
    .then((micfrontenAssetdManifest) =>
      loadResources.loadMultipleResources(
        micfrontenAssetdManifest.entrypoints.map(
          (assetPath) => `${host}/${assetPath}`
        )
      )
    )
    .then(() => {
      console.log("Microfrontend resources loaded successfully");
      window.postMessage(
        {
          message: "RENDER_RANDOM_MICRO_FRONTEND",
        },
        "*"
      );
    })
    .catch((error) =>
      Promise.reject(
        new Error(`Failed to load microfrontend resources: ${error}`)
      )
    );
}

LoadMicrofrontend();
