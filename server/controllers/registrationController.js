const Registration = require('../models/registrationFormModel');
const multer = require('multer');
const path = require('path');
const nodemailer = require("nodemailer");

const generateApplicationNo = () => {
    const day = new Date();

    // return `SOI${Date.now().toString().slice(-8)}${Math.floor(10000000000 + Math.random() * 90000000000)}`;
    return `SOI${day.getFullYear()}${String(day.getMonth() + 1).padStart(2, '0')}${String(day.getDate()).padStart(2, '0')}${String(1).padStart(3, '0')}`;


};


const Password = "cors@2024";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
});

const storage = multer.diskStorage({
    destination: './public/users/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpg, jpeg, png, and pdf are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 750 * 1024 }
}).fields([
    { name: 'idtype_doc' },
    { name: 'upload_annexure' },
    { name: 'usertype_doc' }
]);

exports.createRegistration = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message, success: false });
        }


        const { region, mobile_no, name, company_name, email, address, district, state, pincode, usertype, photo_id_type, idtype_doc, upload_annexure, usertype_doc, category, emptype } = req.body;

        const username = email.split('@')[0];

        const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        // const lastAppNum = await Registration.findAll({
        //     order: [['application_no', 'DESC']],
        //     limit: 1,
        // });

        // let application_no;
        // const appInc = parseInt((lastAppNum[0].application_no).replace('SOI', ''),10)+1;


        // if (lastAppNum.length > 0) {
        //     // application_no = 'SOI' + appInc;
        //     application_no = 'SOI' + appInc;
        // } else {
        //     application_no = generateApplicationNo();
        // }

        try {
            const lastAppNum = await Registration.findAll({
                order: [['application_no', 'DESC']],
                limit: 1,
            });

            let application_no;
            if (lastAppNum.length > 0) {
                const appInc = parseInt(lastAppNum[0].application_no.replace('SOI', ''), 10) + 1;
                application_no = 'SOI' + appInc.toString().padStart(3, '0');
            } else {
                application_no = generateApplicationNo();
            }


            const baseData = {
                region,
                mobile_no,
                name,
                application_no,
                company_name,
                usertype,
                email,
                address,
                district,
                state,
                pincode,

                username,
                password: Password,
                date_created: dateCreatedInKolkata,
                photo_id_type,
                category,
                idtype_doc: req.files.idtype_doc ? req.files.idtype_doc[0].filename : null,
                upload_annexure: req.files.upload_annexure ? req.files.upload_annexure[0].filename : null
            };

            let newRegistration;
            if (["Govt User", "Research/Academic User"].includes(usertype)) {
                newRegistration = await Registration.create({
                    ...baseData,
                    usertype_doc: req.files.usertype_doc ? req.files.usertype_doc[0].filename : null,
                    emptype
                });
            } else if (usertype === "Private User") {
                newRegistration = await Registration.create(baseData);
            }

            const mailOptions = {
                from: 'cors.surveyofindia@gmail.com',
                to: email,
                subject: 'Registration Information',
                text: `Dear ${name},\n\nYour registration has been completed successfully. Below are your updated credentials:\n\nUsername: ${username}\nPassword: ${Password}\n\nThank you!`,
            };

            await transporter.sendMail(mailOptions);
            res.status(201).json({ message: "Registration successful!", success: true, data: newRegistration });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating registration!', success: false, error });
        }
    });
};

exports.updateRegistration = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message, success: false });
        }

        const sno = req.params.sno;
        // const email = req.params.email;
        const { adminName, is_rejected, email, rejected_reason, emptype, username } = req.body;

        if (!sno) {
            return res.status(400).json({ message: "Registration ID is required for update!", success: false });
        }

        try {
            const registration = await Registration.findOne({ where: { sno } });
            if (!registration) {
                return res.status(404).json({ message: "Registration not found!", success: false });
            }

            const dateUpdatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            const updateData = {
                ...req.body,
                username: username || email.split('@')[0],
                date_updated: dateUpdatedInKolkata,
                // idtype_doc: req.files.idtype_doc ? req.files.idtype_doc[0].filename : registration.idtype_doc,
                // upload_annexure: req.files.upload_annexure ? req.files.upload_annexure[0].filename : registration.upload_annexure,
                ...(is_rejected === "Approved" || "Pending" && { activated_by: adminName, date_modified: dateUpdatedInKolkata }),
                ...(is_rejected === "Rejected" && { rejected_date: dateUpdatedInKolkata, rejected_reason, modified_by: adminName })
            };

            if (["Govt User", "Research/Academic User"].includes(req.body.usertype)) {
                // updateData.usertype_doc = req.files.usertype_doc ? req.files.usertype_doc[0].filename : registration.usertype_doc;
                updateData.emptype = emptype;
            }

            await Registration.update(updateData, { where: { sno } });

            const subject = is_rejected === "Approved" ? 'Congratulations!' : 'Rejection!';
            const text = is_rejected === "Approved"
                ? `Dear ${updateData.username},\n\nYour registration details have been approved successfully. Below are your updated credentials:\n\nUsername: ${updateData.username}\nPassword: ${Password}\n\nThank you!`
                : `Dear ${updateData.username},\n\nYour registration has been rejected due to: ${rejected_reason}. Below are your updated credentials:\n\nUsername: ${updateData.username}\nPassword: ${Password}\n\nThank you!`;

            const mailOptions = {
                from: 'cors.surveyofindia@gmail.com',
                to: registration.email,
                subject,
                text,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Registration updated successfully!", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating registration!', success: false, error });
        }
    });
};

exports.regionTransfer = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message, success: false });
        }

        const dateCreatedInKolkata = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

        try {
            const {
                region,
                is_rejected,
                mobile_no,
                name,
                company_name,
                username,
                email,
                password,
                application_no,
                address,
                district,
                state,
                pincode,
                usertype,
                photo_id_type,
                idtype_doc,
                upload_annexure,
                usertype_doc,
                category,
                emptype
            } = req.body;

            const newRegion = region === 'region-2' ? 'region-1' : 'region-2';
            const baseData = {
                region: newRegion,
                mobile_no,
                name,
                application_no,
                company_name,
                usertype,
                email,
                address,
                district,
                state,
                pincode,
                is_rejected,
                username,
                password,
                date_created: dateCreatedInKolkata,
                photo_id_type,
                category,
                idtype_doc: req.files.idtype_doc ? req.files.idtype_doc[0].filename : null,
                upload_annexure: req.files.upload_annexure ? req.files.upload_annexure[0].filename : null,
                usertype_doc: req.files.usertype_doc ? req.files.usertype_doc[0].filename : null,
                emptype
            };

            const existingRegistration = await Registration.findOne({ where: { mobile_no } });

            if (existingRegistration) {
                if (existingRegistration.region === newRegion) {
                    return res.status(400).json({ message: `This Number ${mobile_no} already exists for ${region}!`, success: false });
                }

                else if (existingRegistration.region !== newRegion) {
                    await Registration.create(baseData);
                    return res.status(200).json({ message: `You have been transferred to ${newRegion}!`, success: true });
                }
            }

            return res.status(404).json({ message: `No registration found for ${mobile_no}.`, success: false });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Internal server error!`, success: false });
        }
    });
};




exports.getSingleData = async (req, res) => {
    try {
        const user = await Registration.findByPk(req.params.sno)
        if (user) {
            res.status(200).json({ success: true, message: "User Data Found!!!", Data: user })
        }
        else {
            res.status(404).json({ message: "User is not Found !!!" })
        }

    }
    catch (error) {
        return res.status(500).json({ message: "Unable to get user !!!" })
    }
}



// rejected data
exports.rejectedData = async (req, res) => {
    try {
        const rejectedInfo = await Registration.findAll({ where: { is_rejected: "Rejected" } })
        const totaldata = rejectedInfo.length

        res.status(200).json({ message: "Rejecteddata Retrieved Successfully!", totaldata: totaldata, RejectedData: rejectedInfo, success: true })
    }
    catch (error) {

        console.log(error)
        res.status(500).json({ message: 'Error retrieving rejectedData !!!', success: false, error });
    }
}

// Approved data Or Total Accepted Users data!!!
exports.approvedData = async (req, res) => {
    try {
        const acceptInfo = await Registration.findAll({ where: { is_rejected: "Approved" } })
        const totaldata = acceptInfo.length
        res.status(200).json({ message: "ApproveddData Retrieved Successfully!", totaldata: totaldata, AcceptedData: acceptInfo, success: true })
    }
    catch (error) {

        console.log(error)
        res.status(500).json({ message: 'Error retrieving ApprovedData !!!', success: false, error });
    }
}



// Region-1 Data
exports.regionOneData = async (req, res) => {
    try {
        const regionOneData = await Registration.findAll({ where: { region: "region-1", is_rejected: "Approved" } })
        const totaldata = regionOneData.length
        res.status(200).json({ message: "Region-1 Data Retrieved Successfully!", totalData: totaldata, RegionOneData: regionOneData, success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error retrieving regionOneData !!!', success: false, error });

    }
}



const fetchUserDataByRegionAndType = async (region, userType) => {
    return await Registration.findAll({
        where: { region, is_rejected: "Approved", usertype: userType }
    });
};

exports.regionOneGPA = async (req, res) => {
    try {
        const regionOneGovData = await fetchUserDataByRegionAndType("region-1", "Govt User");
        const regionOneAcadData = await fetchUserDataByRegionAndType("region-1", "Research/Academic User");
        const regionOnePrivData = await fetchUserDataByRegionAndType("region-1", "Private User");

        const regionTwoGovData = await fetchUserDataByRegionAndType("region-2", "Govt User");
        const regionTwoAcadData = await fetchUserDataByRegionAndType("region-2", "Research/Academic User");
        const regionTwoPrivData = await fetchUserDataByRegionAndType("region-2", "Private User");

        const responseData = {
            region1: {
                govtUserData: regionOneGovData.length,
                acadUserData: regionOneAcadData.length,
                privUserData: regionOnePrivData.length,
                total1: regionOneGovData.length + regionOneAcadData.length + regionOnePrivData.length

            },
            region2: {
                govtUserData: regionTwoGovData.length,
                acadUserData: regionTwoAcadData.length,
                privUserData: regionTwoPrivData.length,
                total2: regionTwoGovData.length + regionTwoAcadData.length + regionTwoPrivData.length
            }
        };

        res.status(200).json({
            message: "Region User Data Retrieved Successfully!",
            data: responseData,
            success: true
        });

    } catch (error) {
        console.error("Error retrieving region data:", error);
        res.status(500).json({
            message: 'Error retrieving region data!',
            success: false,
            error: error.message || error
        });
    }
};
   

// Region-2 Data
exports.region2Data = async (req, res) => {
    try {
        const regionTwoData = await Registration.findAll({ where: { region: "region-2", is_rejected: "Approved" } })
        const totaldata = regionTwoData.length
        res.status(200).json({ message: "Region-1 Data Retrieved Successfully!", TotalData: totaldata, Region2Data: regionTwoData, success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error retrieving regionTwoData !!!', success: false, error });

    }
}

//Pending Users List
exports.pendingList = async (req, res) => {
    try {
        const pendingList = await Registration.findAll({ where: { is_rejected: "Pending" } })
        const totaldata = pendingList.length
        res.status(200).json({ message: "pending List Retrived Successfully!", success: true, totaldata: totaldata, pendingData: pendingList })
    }
    catch (error) {
        console.log(error)
        res.ststus(500).json({ message: "unable to retrive Pending user data!!!", success: false, error })
    }
}
//get all users
exports.viewAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.findAll();
        const totaldata = registrations.length
        res.status(200).json({ message: "Registrations data retrieved successfully!!!", TotalData: totaldata, data: registrations, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving registrations !!!', success: false, error });
    }
};






