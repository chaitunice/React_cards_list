# Azure Hosting Runbook

This project has a React frontend and a separately hosted Django REST API. The frontend is deployed as an Azure Static Web App; the API runs in an Azure App Service.

## Repositories And Services

| Component | Repository or service | Deployment target |
| --- | --- | --- |
| React frontend | [chaitunice/React_cards_list](https://github.com/chaitunice/React_cards_list) | Azure Static Web App: <https://gentle-hill-0ae0d2d0f.4.azurestaticapps.net/> |
| Django REST API | App Service `drfproject`; source repository is not identified in this frontend repository | Azure App Service: <https://drfproject.azurewebsites.net/> |

The frontend requests `https://drfproject.azurewebsites.net/watch/list/`. Changes to the API, its database, or its CORS settings belong to the API project/App Service, not this React repository. Find and record the API source repository URL before making backend code changes; it is not configured here.

## First-Time Provisioning

1. Locate the Django API source repository and confirm its production endpoint and database are available. The API source repository is not present in this workspace.
2. Deploy the Django API separately to the `drfproject` App Service. Verify `https://drfproject.azurewebsites.net/watch/list/` returns JSON before connecting the frontend.
3. In Azure Portal, create or select the Static Web App and connect the GitHub repository `chaitunice/React_cards_list` on branch `main`.
4. Configure the frontend build as Create React App: app location `/`, API location blank, output location `build`. The workflow in the next section already contains these values.
5. Add the Static Web App's exact origin to the API App Service CORS allowlist using the instructions below.
6. Push the frontend to `main`, wait for the GitHub Actions deployment to succeed, then test the button on the deployed URL.

## Static Web App Deployment

The workflow at `.github/workflows/azure-static-web-apps-gentle-hill-0ae0d2d0f.yml` deploys on pushes to `main`. Its current paths are:

- `app_location: "/"`: frontend project root
- `api_location: ""`: no Azure Functions API is deployed from this repository
- `output_location: "build"`: Create React App production output

GitHub Actions uses Oryx to install Node dependencies and run `npm run build`. CI treats ESLint warnings as errors, so validate using the same behavior before pushing:

```sh
npm ci
CI=true npm run build
```

Then push the frontend change to `main` and check the repository's **Actions** tab. Wait for the Azure Static Web Apps workflow to finish successfully. Pull requests also create preview deployments; closing the pull request closes the preview.

The workflow expects the GitHub Actions secret `AZURE_STATIC_WEB_APPS_API_TOKEN_GENTLE_HILL_0AE0D2D0F`. Store the token as a repository secret in GitHub; never put its value in source control or this runbook.

## API CORS Configuration

Browsers block the API response unless the API allows the exact Static Web App origin. In Azure Portal:

1. Open the `drfproject` App Service that serves `drfproject.azurewebsites.net`.
2. Open **API > CORS**.
3. Add this origin, without a trailing slash or path:

   ```text
   https://gentle-hill-0ae0d2d0f.4.azurestaticapps.net
   ```

4. Preserve any other required origins and save the setting. Make sure this is the production API App Service, not a different app or deployment slot.
5. Verify the preflight response from a terminal:

   ```sh
   curl -i -X OPTIONS https://drfproject.azurewebsites.net/watch/list/ \
     -H "Origin: https://gentle-hill-0ae0d2d0f.4.azurestaticapps.net" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: content-type"
   ```

   A successful response should be `200` and include:

   ```text
   Access-Control-Allow-Origin: https://gentle-hill-0ae0d2d0f.4.azurestaticapps.net
   ```

6. Open the Static Web App, click **Click Here**, and confirm cards appear. If the browser reports `Network Error` or a CORS policy error, check the API App Service's CORS list and its browser console. The API returning `200` to curl without an allowed-origin header is not sufficient; the browser still blocks that response.

The `cors` npm package in the frontend dependencies does not configure CORS for the remote API. CORS must be enabled by the API host/application.

## Optional Docker Hosting

The repository also contains a `Dockerfile` and `docker-compose.yml` for a separate container-based hosting path. Azure Static Web Apps does not use these files; it builds the frontend with Oryx as described above.

If choosing an Azure Web App custom container instead of Static Web Apps, build and publish the Docker image and configure the Web App to use it. The Dockerfile builds the React app and serves the static files with nginx on port `80`; configure the container port as `80` (for example, `WEBSITES_PORT=80` if required by the Web App configuration). For local Docker Compose, the app is exposed on `http://localhost:3010`.

Do not mix the two frontend deployment paths: use the Static Web Apps workflow for the current site, or the container pipeline for a custom-container Web App. Both still depend on the separately hosted API and its CORS allowlist.

## Troubleshooting Checklist

- **Oryx says warnings are errors:** run `CI=true npm run build`; fix reported ESLint issues before deploying.
- **The site loads but the list is empty:** click the button and inspect the browser console and Network panel. Check the API request status and CORS response headers.
- **Preflight says the origin is not allowed:** add the exact Static Web App origin to CORS on the `drfproject` API App Service.
- **The API returns `200`, but the browser still fails:** verify `Access-Control-Allow-Origin` is present and exactly matches the page origin. Check credentials and allowed headers if those are used.
- **The workflow succeeds but the site is stale:** verify the workflow ran for the latest commit on `main` and that `output_location` remains `build`.
- **A Docker change does not affect the Static Web App:** expected; its workflow builds from source with Oryx and does not build the Dockerfile.