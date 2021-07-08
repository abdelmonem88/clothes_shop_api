require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
 .base("appmN8a79xDJTptTn")
 .table("clothes");

exports.handler = async (event, context) => {
 const { id } = event.queryStringParameters;
 

 if (id) {
  try {
   const item = await airtable.retrieve(id);
   if (item.error) {
    return {
     statusCode: 404,
     body: `No item with id: ${id}`,
    };
   }
   return {
    headers: {
     "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify(item),
   };
  } catch (error) {
   return {
    statusCode: 500,
    body: `Server Error`,
   };
  }
 }

 try {
  const { records } = await airtable.list();

  return {
   headers: {
    "Access-Control-Allow-Origin": "*",
   },
   statusCode: 200,
   body: JSON.stringify(records),
  };
 } catch (error) {
  return {
   statusCode: 500,
   body: "it was an Error",
  };
 }
};
