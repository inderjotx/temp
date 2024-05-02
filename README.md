# TokenJobs Scrapping

Scrapes Data for Web3Jobs

## Installation

To get started with this project, you'll first need to install the necessary dependencies:

```bash
yarn install
```

## Compilation

Compile the TypeScript code (or any other compilation needed) by running:

```bash
yarn tsc
```

## Environment Variables

### scraper package

`/packages/scraper/.env`

```bash
mv .env.example .env
```

and update the `.env` file with your own values.
Github environment variable are to make pull request after scraping latest data .

- `GITHUB_API_TOKEN`: GitHub API token
- `GITHUB_OWNER`: GitHub owner
- `GITHUB_REPO`: GitHub repo
- `CRUNCHBASE_API_KEY`: Crunchbase API key , to get information about companies

### data-api package

`/packages/data-api/.env`

```bash
mv .env.example .env
```

and update the `.env` file with your own values.

- `CRUNCHBASE_API_KEY`: Crunchbase API key , to get information about companies

### Remove compiled files

```bash
yarn clean
```

## Usage

This project includes several scripts to perform various tasks:

### Scraping Data

To run the data scraping scripts:

```bash
yarn scrape [flags]
```

| Flag                  | Type      | Description                               | Required | Default                  |
| --------------------- | --------- | ----------------------------------------- | -------- | ------------------------ |
| `--company-id`        | `string`  | Run only for a specific company           | No       | All companies            |
| `--skip-pull-request` | `boolean` | Skip the pull-request creation            | No       | makes pull request       |
| `--write-local-data`  | `boolean` | Skip writing the output to jobs-data.json | No       | writes to jobs-data.json |

### Create company data

```bash
yarn create-company [flags]
```

| Flag                  | Type     | Description                            | Required |
| --------------------- | -------- | -------------------------------------- | -------- |
| `--id`                | `string` | Company ID                             | Yes      |
| `--name`              | `string` | Company name                           | Yes      |
| `--url`               | `string` | Company website URL                    | Yes      |
| `--scraping-strategy` | `string` | Scraping strategy                      | Yes      |
| `--scraping-id`       | `string` | Scraping ID (defaults to company ID)   | No       |
| `--crunchbase-id`     | `string` | Crunchbase ID (defaults to company ID) | No       |

### Update company metadata

This uses `crunchbase-api` to get the company data from Crunchbase.

```bash
yarn update-company-metadata [flags]
```

| Flag              | Type      | Description                                                        | Optional |
| ----------------- | --------- | ------------------------------------------------------------------ | -------- |
| `--company-id`    | `string`  | Run only for a specific company                                    | Yes      |
| `--limit`         | `number`  | Run only on the first n companies                                  | Yes      |
| `--wait-time`     | `number`  | Wait time between requests to Crunchbase, to prevent rate limiting | Yes      |
| `--skip-existing` | `boolean` | Skip companies with existing metadata?                             | Yes      |
| `--skip-writing`  | `boolean` | Skip writing the output to companies-data.json?                    | Yes      |

### Normalization Checks

```bash
yarn check-normalizations
```

## Testing

```bash
yarn test
```
