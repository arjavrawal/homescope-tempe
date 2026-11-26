# HomeScope Tempe

**Explore Housing. Understand Neighborhoods.**

An interactive WebGIS dashboard for housing affordability and neighborhood exploration in Tempe, Arizona.

GIS 494/598 – WebGIS  
Fall 2026 | Arizona State University  
School of Geographical Sciences and Urban Planning

## Project Team

| Team Member | Course | Role |
| --- | --- | --- |
| Nikita Soni | GIS 598 | Frontend UI Designer, Data Collector, Meeting Organizer |
| Farhan Abbas | GIS 598 | Frontend Developer |
| Arjav Rawal | GIS 494 | Backend Developer, Data Processor |
| Nathan Dejonge | GIS 494 | Backend Developer |

## GitHub Repository

[HomeScope Tempe GitHub Repository](https://github.com/farhan184110/webgis-final-project)                               |


## About the Project

HomeScope Tempe helps people explore housing costs, demographic characteristics, and nearby amenities in Tempe, Arizona.

Finding a suitable place to live involves more than considering monthly rent or property prices. People also need to understand the surrounding neighborhood and the availability of public transportation, schools, grocery stores, healthcare facilities, and parks. However, this information is often scattered across multiple websites and data sources.

We built HomeScope Tempe to bring this information together into a single interactive map, helping people identify areas that match their housing budget and neighborhood preferences.

## Who Can Use This Dashboard?

- Students looking for affordable housing and nearby public transportation.
- Families looking for housing near schools, parks, and healthcare facilities.
- Working professionals exploring housing options based on their budget and daily needs.
- People planning to relocate to Tempe.
- Existing residents considering moving to another neighborhood.

The dashboard helps users identify potential areas of interest before searching for individual properties. It provides census block group information rather than real-time housing listings.

## What the Dashboard Does

- Filters census block groups by selected median monthly rent and median home value.
- Displays median household income, population, median age, housing tenure, and age distribution for the selected census block group.
- Shows the locations of bus stops, light rail stations, schools, grocery stores, healthcare facilities, and parks across the study area.
- Reports the number of nearby amenities within one mile of a selected census block group's centroid.
- Allows users to turn amenity layers on and off.
- Provides OpenStreetMap and USGS Topo basemap options.
- Uses marker clustering, tooltips, and popups to make map exploration easier.
- Supports desktop, tablet, and mobile screen sizes.

## How It Works

The dashboard is built using HTML, CSS, JavaScript, and Leaflet.

Housing and demographic data come from the American Community Survey (ACS), while spatial datasets are collected from different public data providers.

ArcGIS Pro and PostgreSQL/PostGIS are used to prepare the datasets and calculate nearby amenity counts. The processed datasets are exported as static GeoJSON files and stored in the repository.

JavaScript loads these files into the Leaflet map, handles the housing filters, and displays information when a user selects a census block group.

All dashboard interactions run in the web browser. There is no need for a continuously running database, GeoServer, or separate backend service.

## Run the Dashboard

### Using Visual Studio Code

Clone the repository:

```bash
git clone https://github.com/farhan184110/webgis-final-project.git
```

Open the project folder:

```bash
cd webgis-final-project
code .
```

1. Install the Live Server extension in Visual Studio Code.
2. Open `index.html`.
3. Right-click and select **Open with Live Server**.
4. The dashboard will open in your browser.

### Using Python

Alternatively, if Python is installed, run the following command from the project folder:

```bash
python -m http.server 8000
```

Open the following address in your browser:

http://localhost:8000/

The dashboard needs a local HTTP server because JavaScript uses `fetch()` to load GeoJSON files.

An internet connection is required to load the external mapping libraries and basemaps.

No additional Python packages, npm installation, or database connection are required to run the existing dashboard.

## Where Things Are

- `index.html` – The main dashboard page. Contains the navigation header, filter panel, map panel, and details panel.
- `style.css` – Controls the dashboard colors, fonts, layout, spacing, accessibility, and responsive design.
- `js/` – Contains the JavaScript code responsible for loading datasets, displaying map layers, applying filters, and updating the details panel.
- `images/` – Contains the dashboard logo, amenity icons, and other visual assets.
- `original_data/` – Contains the original spatial datasets collected from different data providers.
- `working_data/` – Contains the processed GeoJSON datasets used by the dashboard.
- `README.md` – Project overview, setup instructions, and developer documentation.

The repository also serves as the central location for project documentation and final deliverables:

- Group Charter
- Project Proposal
- Group Meeting Minutes
- Frontend Design Concept
- Milestone Timeline
- Prototype Presentation
- Project Development Report
- Technical Memo
- User Guide
- Final Project Presentation

Refer to the repository for the latest available versions of these files.

## Data Sources

| Dataset | Source |
| --- | --- |
| Census block group boundaries | U.S. Census Bureau TIGER/Line |
| Housing, income, and demographic data | American Community Survey (ACS), five-year estimates |
| Bus stops and light rail stations | Valley Metro |
| Schools | Arizona Department of Education / AZGeo |
| Grocery stores | Maricopa Association of Governments (MAG) |
| Healthcare facilities | Arizona Department of Health Services / AZGeo |
| Parks | City of Tempe Open Data Portal |
| Street basemap | OpenStreetMap |
| Topographic basemap | USGS The National Map |

Additional information about the datasets is provided in the Data section of the dashboard and the Project Development Report.

## Technology Used

| Technology | Purpose |
| --- | --- |
| HTML | Dashboard structure |
| CSS | Styling and responsive layout |
| JavaScript | Filters, data loading, and user interactions |
| Leaflet 1.9.4 | Interactive web map |
| Leaflet.markercluster 1.5.3 | Marker clustering |
| GeoJSON | Spatial data storage and integration |
| ArcGIS Pro | Spatial data preparation and export |
| PostgreSQL / PostGIS | Spatial processing and proximity calculations |
| pgAdmin | Database management |
| Git and GitHub | Version control and team collaboration |
| Visual Studio Code | Development and local testing |

## Project Architecture

```text
Public Data Sources
        |
        v
ArcGIS Pro / PostgreSQL / PostGIS
        |
        v
Data Cleaning and Spatial Processing
        |
        v
Static GeoJSON Files
        |
        v
HTML / CSS / JavaScript / Leaflet
        |
        v
HomeScope Tempe Dashboard
```

The team selected static GeoJSON instead of a dedicated spatial service such as GeoServer because the datasets were small enough to handle directly in the browser.

This makes the dashboard easier to run and deploy. However, new datasets must be manually processed and replaced when updates become available.

## Changing the Dashboard

- To change the dashboard structure or text, edit `index.html`.
- To change colors, fonts, spacing, or layout, edit `style.css`.
- To change filters, map layers, or interactive functionality, edit the JavaScript files in `js/`.
- To change the dashboard logo or map icons, update the assets in `images/` and their corresponding code references.
- To update spatial datasets, replace the relevant processed GeoJSON files in `working_data/`.

When changing the code, make sure the HTML element IDs, JavaScript selectors, dataset attribute names, and file paths remain consistent.

## Updating the Data

The dashboard does not automatically retrieve updated datasets from the original data providers.

To update the data:

1. Download the latest dataset from its original source.
2. Clean and prepare the dataset using ArcGIS Pro or PostgreSQL/PostGIS.
3. Select or filter the data for the Tempe study area.
4. Export the processed dataset as GeoJSON using WGS 84 coordinates.
5. Replace the corresponding dataset in `working_data/`.
6. Update JavaScript references if filenames or attribute names have changed.
7. Recalculate nearby amenity counts if amenity locations or block group boundaries have changed.
8. Run the dashboard locally and check that the updated data is displayed correctly.

Nearby amenity counts are calculated during data preparation using PostGIS. They are stored as attributes and displayed when a census block group is selected.

## Limitations

- Census block groups are statistical areas and may not represent actual neighborhood boundaries.
- Housing costs and demographic indicators represent area-level estimates rather than individual properties or households.
- The dashboard does not provide real-time rental or property listings.
- ACS margins of error are not incorporated into the housing filters.
- Nearby amenities are measured using a one-mile straight-line distance, not actual walking or driving distances.
- Static datasets require manual updates.
- The dashboard currently covers Tempe, Arizona.

## Project Documentation

- **README:** Instructions for developers to understand, run, maintain, and modify the dashboard.
- **User Guide:** Step-by-step instructions for using the dashboard.
- **Project Development Report:** Detailed information about data preparation, system architecture, implementation, and testing.
- **Technical Memo:** Technical decisions, alternative approaches, and their rationale.

