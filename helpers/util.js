import mongoDB from "./mongo.js";
import { nanoid } from "nanoid";
import axios from "axios";
import slugify from "slugify";
import supabaseDB from "./supabase.js";

export const fetchAllWithRegistrationNumber = async () => {
  const data = await (
    await mongoDB()
  )
    .collection("teams-page")
    .find({ "Registration Number": { $exists: true } })
    .toArray();
  return data;
};

export const addDownloadLink = (data) => {
  const downlaodUrl = `https://drive.google.com/uc?export=view&id=`;
  const newData = [];
   data.forEach((e) => {
    const id = new URL(e.imageURL).searchParams.get("id");
    if (!id) {
      return;
    }
    newData.push({
      ...e,
      downloadURL: downlaodUrl + id,
    });
  });
  return newData;
};

export const generateSuffix = (rootFolder = "team/", team, name) => {
  return rootFolder + team + "/" + slugify(name + "-" + nanoid(4));
};

export const uploadImageToSupabase = async (downloadURL, name, team) => {
  const imageData = await axios.get(downloadURL, {
    responseType: "arraybuffer",
  });
  const suffix= generateSuffix("team/", team, name);
  const { data, error } = await (await supabaseDB()).storage
  .from("alexadevsrm.com")
  .upload(suffix, imageData.data, {
    cacheControl: "3600",
    upsert: false,
  });
  if(error){
    console.log(error);
    return '';
  }
  return suffix;
};

export const updateMongoDocument =async(regNumber, suffix)=>{
    try{
        await (
            await mongoDB()
          )
            .collection("teams-page")
            .updateOne({ "Registration Number": regNumber }, {$set: {
                imageURL: "https://zxzqcraintdtgkozfelt.supabase.co/storage/v1/object/public/alexadevsrm.com/" + suffix
            }});
    }catch(err){
        console.log(err);
    }
}
