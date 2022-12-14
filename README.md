## A simple script to transfer drive files to supabase storage (or GCS/AWS on the same principle.)

## Steps to start

Install dependencies:

```
npm i
```

Run the script:

```
npm run start
```

##### Note: Make sure that that all the enviroment variables in .env.example are set properly.

## How does this work?

For this to work, the drive links of the images/videos must be made public. Then the ids are used in the export drive link (https://drive.google.com/uc?export=view&id={id}) to download the content and then upload them to a storage service of choice.
