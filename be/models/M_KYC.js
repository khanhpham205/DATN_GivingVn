const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const KYCSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', },

    flag: { type: Boolean, required: true},
    verification_status: { type: Number, require:true },

    dt_front_cccd:       { type: String },
    dt_back_cccd:        { type: String },
    dt_vid:              { type: String },

    info_cccdId:         { type: String, },
    info_name:           { type: String, },
    info_DateOfBirth:    { type: String, },
    info_sex:            { type: String, },
    info_nationality:    { type: String, },
    info_home:           { type: String, },
    info_address:        { type: String, },
    info_DateOfExpire:   { type: String, },
    info_Features:       { type: String, },
    info_IssueDate:      { type: String, },//ngay lam cccd
    info_IssueLocation:  { type: String, },

},{ timestamps: true } );
const tmp = {
    "errorCode": 0,
    "errorMessage": "",
    "data": [
        {
            "id": "079205031850",
            "id_prob": "99.33",
            "name": "PHẠM NGUYỄN BẢO KHÁNH",
            "name_prob": "99.93",
            "dob": "15/12/2005",
            "dob_prob": "99.01",
            "sex": "NAM",
            "sex_prob": "99.24",
            "nationality": "VIỆT NAM",
            "nationality_prob": "99.44",
            "home": "QUẢNG TRẠCH, QUẢNG BÌNH",
            "home_prob": "98.45",
            "address": "36E1 TỔ 5 ẤP 5, XUÂN THỚI SƠN, HÓC MÔN, HỒ CHÍ MINH",
            "address_prob": "99.05",
            "doe": "15/12/2030",
            "doe_prob": "98.44",
            "overall_score": "99.63",
            "number_of_name_lines": "1",
            "address_entities": {
                "province": "HỒ CHÍ MINH",
                "district": "HÓC MÔN",
                "ward": "XUÂN THỚI SƠN",
                "street": "36E1 TỔ 5 ẤP 5"
            },
            "type_new": "cccd_chip_front",
            "type": "chip_front"
        }
    ]
}
// Id	079205031850
// Name	PHẠM NGUYỄN BẢO KHÁNH
// Date of birth	15/12/2005
// Sex	NAM
// Nationality	VIỆT NAM
// Home	QUẢNG TRẠCH, QUẢNG BÌNH
// Address	36E1 TỔ 5 ẤP 5, XUÂN THỚI SƠN, HÓC MÔN, HỒ CHÍ MINH
// Date of expire	15/12/2030
// RecognitionKeyGroup.overall_score	99.63
// RecognitionKeyGroup.number_of_name_lines	1

// Features	NỐT RUỒI ĐẦU MÁY TRÁI
// Issue date	16/04/2021
// Issue location	CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI

// RecognitionKeyGroup.overall_score	99.77
// RecognitionKeyGroup.mrz_details	{ "id": "079205031850", "name": "PHAM NGUYEN BAO KHANH", "doe": "15/12/2030", "dob": "15/12/2005", "nationality": "VNM", "sex": "M" }

const User = mongoose.model("KYC", KYCSchema);
module.exports = User;
