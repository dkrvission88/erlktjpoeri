const subscriptionPaymentFinal = require("../models/subscription_payment_final");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const MAX_FILE_SIZE = 750 * 1024; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './public/PaymentReceipt/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE }  
});

const uploadPDF = upload.single('path_sub_pdf');

const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = date.toLocaleString('default', { month: 'short' });
const year = String(date.getFullYear()).slice(-2);
const randomNumber = Math.floor(100000 + Math.random() * 900000);

// async function sendEmail(formData) {
 

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     },
// });

//   const mailOptions = {
//     from:'cors.surveyofindia@gmail.com',  
//     to: formData.email,  
//     subject: 'Subscription Payment Received',
//     text: `Hello ${formData.name},\n\nWe have received your subscription payment. Below are the details:\n\nReceipt No: ${formData.subs_recieptNo}\nAmount: ${formData.subs_recieptAmt}\nGST Amount: ${formData.gst_recieptAmt}\n\nYou can view your receipt PDF by clicking the link below:\n\n${formData.path_sub_pdf}\n\nThank you!`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

exports.submitSubsPaymentFinal = async (req, res) => {
  try {
    uploadPDF(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: "File size is too large. Maximum allowed size is 750 KB.", success: false });
        }
        return res.status(500).json({ message: "Error in file upload", success: false, error: err.message });
      }

      const {
        name, state_id, address, email, mobile, region_name, subs_recieptNo, subs_recieptAmt,
        GST_name, GST_number, user_reg_id, cors_plan, subscription_charges, GST_amt
      } = req.body;

      if (!subs_recieptNo || !subs_recieptAmt || !name || !email || !mobile || !address || !state_id) {
        return res.status(400).json({ message: "Missing required fields", success: false });
      }

      const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const acknowledgmentN = `${region_name === "region-1" ? 'R-1' : 'R-2'}-${day}${month}${year}-${randomNumber}`;

      const formData = {
        ack_no: acknowledgmentN,
        subs_recieptNo,
        subs_recieptAmt,
        gst_recieptAmt: GST_amt,
        name,
        email,
        user_reg_id,
        cors_plan,
        subscription_charges,
        mobile,
        address,
        state_id,
        date_created: dateCreatedInKolkata,
        GST_name: GST_name || null,
        GST_number: GST_number || null,
        path_sub_pdf: req.file ? req.file.path : null,
      };

      const createdFormData = await subscriptionPaymentFinal.create(formData);

      // await sendEmail(createdFormData);

      res.status(201).json({
        message: 'Form data submitted successfully!',
        data: createdFormData,
        success: true,
      });
    });
  } catch (error) {
    console.error('Error in details submission:', error);
    res.status(500).json({ message: "Error in details submission!", success: false, error: error.message });
  }
};



// const subscriptionPaymentFinal = require("../models/subscription_payment_final");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// const date = new Date();
// const day = String(date.getDate()).padStart(2, '0');
// const month = date.toLocaleString('default', { month: 'short' });
// const year = String(date.getFullYear()).slice(-2);
// const randomNumber = Math.floor(100000 + Math.random() * 900000);




// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = './public/PaymentReceipt/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// const uploadPDF = upload.single('path_sub_pdf');

// exports.submitSubsPaymentFinal = async (req, res) => {
//   try {
//     uploadPDF(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error in file upload", success: false, error: err.message });
//       }

//       const {
//         name, state_id, address, email, mobile,region_name, subs_recieptNo, subs_recieptAmt,
//         GST_name, GST_number, user_reg_id, cors_plan, subscription_charges, GST_amt
//       } = req.body;

      

//       const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
//       const acknowledgmentN = `${region_name==="region-1"?'R-1':'R-2'}-${day}${month}${year}-${randomNumber}`;



//       // if (!subs_recieptNo || !subs_recieptAmt || !name || !email || !mobile || !address || !state_id) {
//       //   return res.status(400).json({ message: "Missing required fields", success: false });
//       // }

//       const formData = {
//         ack_no: acknowledgmentN,
//         subs_recieptNo,
//         subs_recieptAmt,
//         gst_recieptAmt: GST_amt,
//         name,
//         email,
//         user_reg_id,
//         cors_plan,
//         subscription_charges,
//         mobile,
//         address,
//         state_id,
//         date_created: dateCreatedInKolkata,
//         GST_name: GST_name || null,
//         GST_number: GST_number || null,
//         path_sub_pdf: req.file ? req.file.path : null,
//       };

//       const createdFormData = await subscriptionPaymentFinal.create(formData);

//       res.status(201).json({
//         message: 'Form data submitted successfully!',
//         data: createdFormData,
//         success: true
//       });
//     });
//   } catch (error) {
//     console.error('Error in details submission:', error);
//     res.status(500).json({ message: "Error in details submission!", success: false, error: error.message });
//   }
// };






exports.getSubsPaymentFinal = async (req, res) => {
  try {
    let getData = await subscriptionPaymentFinal.findAll();

    if (getData.length === 0) {
      return res
        .status(200)
        .send({ message: "Data not found!", success: true });
    }

    res
      .status(200)
      .send({ message: "Data fetched successfully!", success: true, data: getData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in details fetching!", success: false, error });
  }
};

exports.updateSubsPaymentFinal = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: "Error in final payment details updation",
      success: false,
      error,
    });
  }
};
























