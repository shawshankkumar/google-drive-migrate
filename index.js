import {
  fetchAllWithRegistrationNumber,
  addDownloadLink,
  uploadImageToSupabase,
  updateMongoDocument,
} from "./helpers/util.js";

(async () => {
  const allData = await fetchAllWithRegistrationNumber();
  const downloadLinkData = await addDownloadLink(allData);
  for (let i = 0; i < downloadLinkData.length; i++) {
    const suffix = await uploadImageToSupabase(
      downloadLinkData[i].downloadURL,
      downloadLinkData[i].name,
      downloadLinkData[i].team
    );
    console.log(i, suffix);
    await updateMongoDocument(
      downloadLinkData[i]["Registration Number"],
      suffix
    );
  }
  process.exit(1);
})();
