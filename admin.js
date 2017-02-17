var admin = require("firebase-admin");
var parseJson = require('parse-json');

var serviceAccount = require("./agza5ana-v1-bb35c-firebase-adminsdk-hpqgv-3e5b1d8c94.json");

// var medicineInfo = require("./medecineInfo.json");
var medicineName = require("./medecineName.json");
// var medicineBarcode = require("./medecineBarcode.json");
// var medicineNameArabic = require("./medicineNameArabic.json");

console.log("Starting................\n");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agza5ana-v1-bb35c.firebaseio.com/"
});


//admin.database.enableLogging(true);
var db = admin.database();
// var ref = db.ref("medicineInfo");
// ref.orderByKey().limitToFirst(5).once("value",
//   function(snapshot) {
//     console.log(snapshot.val());
//   },
//   function(err) {
//     console.log(err);
//   });
// db.ref("medicineInfo").set(medicineInfo,function(error){
//   if(error) {
//     console.error(error);
//   } else {
//     console.log("success");
//   }
// });
db.ref("medicineName").set(medicineName,function(error){
  if(error) {
    console.error(error);
  } else {
    console.log("success");
  }
});
// db.ref("medicineBarcode").set(medicineBarcode,function(error){
//   if(error) {
//     console.error(error);
//   } else {
//     console.log("success");
//   }
// });
// db.ref("medicineNameArabic").set(medicineNameArabic,function(error){
//   if(error) {
//     console.error(error);
//   } else {
//     console.log("success");
//   }
// });
