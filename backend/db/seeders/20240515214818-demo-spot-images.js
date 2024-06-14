'use strict';

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+01/Gemini_Generated_Image_q2zyk8q2zyk8q2zy.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+01/Gemini_Generated_Image_q2zyk6q2zyk6q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+01/Gemini_Generated_Image_q2zyk4q2zyk4q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+01/Gemini_Generated_Image_q2zyk5q2zyk5q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+01/Gemini_Generated_Image_q2zyk7q2zyk7q2zy.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+02/Gemini_Generated_Image_1c841q1c841q1c84.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+02/Gemini_Generated_Image_4p7nsa4p7nsa4p7n.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+02/Gemini_Generated_Image_vu8r2zvu8r2zvu8r.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+02/Gemini_Generated_Image_4p7ns74p7ns74p7n.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+02/Gemini_Generated_Image_4p7ns94p7ns94p7n.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+03/Gemini_Generated_Image_p8zmscp8zmscp8zm.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+03/Gemini_Generated_Image_vgvo75vgvo75vgvo.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+03/Gemini_Generated_Image_vgvo78vgvo78vgvo.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+03/Gemini_Generated_Image_66oze566oze566oz.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+03/Gemini_Generated_Image_xzs12ixzs12ixzs1.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+04/Gemini_Generated_Image_ylz9xyylz9xyylz9.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+04/Gemini_Generated_Image_mvndtpmvndtpmvnd.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+04/Gemini_Generated_Image_mvndtqmvndtqmvnd.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+04/Gemini_Generated_Image_efod9eefod9eefod.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+04/Gemini_Generated_Image_lzjx6blzjx6blzjx.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+05/Gemini_Generated_Image_p7aj1qp7aj1qp7aj.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+05/Gemini_Generated_Image_p7aj1op7aj1op7aj.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+05/Gemini_Generated_Image_p7aj1mp7aj1mp7aj.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+05/Gemini_Generated_Image_p7aj1np7aj1np7aj.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+05/Gemini_Generated_Image_p7aj1pp7aj1pp7aj.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_mvhg96mvhg96mvhg.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_9cqlrc9cqlrc9cql.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_loc71jloc71jloc7.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_mvhg94mvhg94mvhg.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_esh4vqesh4vqesh4.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+07/Gemini_Generated_Image_15n2sm15n2sm15n2.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+07/Gemini_Generated_Image_4tx32h4tx32h4tx3.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+07/Gemini_Generated_Image_ijntxzijntxzijnt.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+07/Gemini_Generated_Image_lhf0nllhf0nllhf0.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+07/Gemini_Generated_Image_lhf0nilhf0nilhf0.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+08/Gemini_Generated_Image_jgifjsjgifjsjgif.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+08/Gemini_Generated_Image_ooohjmooohjmoooh.jpeg",
        preview: false
      }, {
        spotId: 8,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+08/Gemini_Generated_Image_ivppxoivppxoivpp.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+08/Gemini_Generated_Image_4thva74thva74thv.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+08/Gemini_Generated_Image_jgifjwjgifjwjgif.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+09/Gemini_Generated_Image_8etvtq8etvtq8etv.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+09/Gemini_Generated_Image_5w6vv85w6vv85w6v.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+09/Gemini_Generated_Image_5y69d35y69d35y69.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+09/Gemini_Generated_Image_1144gv1144gv1144.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+09/Gemini_Generated_Image_8etvtp8etvtp8etv.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+10/Gemini_Generated_Image_tia9x5tia9x5tia9.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+10/Gemini_Generated_Image_xwe6yfxwe6yfxwe6.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+10/Gemini_Generated_Image_w8ew5zw8ew5zw8ew.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+10/Gemini_Generated_Image_xwe6yexwe6yexwe6.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+10/Gemini_Generated_Image_eqq3ayeqq3ayeqq3.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_rsmdvsrsmdvsrsmd.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tochw4tochw4.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tqchw4tqchw4.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_uxoc8wuxoc8wuxoc.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tpchw4tpchw4.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+12/Gemini_Generated_Image_9ehbvd9ehbvd9ehb.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+12/Gemini_Generated_Image_der5afder5afder5.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+12/Gemini_Generated_Image_olebgwolebgwoleb.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+12/Gemini_Generated_Image_olebgzolebgzoleb.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+12/Gemini_Generated_Image_olebgxolebgxoleb.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=56",
        preview: true
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=57",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=58",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=59",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=60",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=61",
        preview: true
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=62",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=63",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=64",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=65",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=66",
        preview: true
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=67",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=68",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=69",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=70",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_7zrzog7zrzog7zrz.jpeg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_igreezigreezigre.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_oy684poy684poy68.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_wdk55bwdk55bwdk5.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_nrg9frnrg9frnrg9.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+17/Gemini_Generated_Image_un5c6iun5c6iun5c.jpeg",
        preview: true
      },
      {
        spotId: 17,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+17/Gemini_Generated_Image_te4wm4te4wm4te4w.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+17/Gemini_Generated_Image_dah9idah9idah9id.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+17/Gemini_Generated_Image_dah9gdah9gdah9gd.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+17/Gemini_Generated_Image_92dq0v92dq0v92dq.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+18/Gemini_Generated_Image_9jy5v49jy5v49jy5.jpeg",
        preview: true
      },
      {
        spotId: 18,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+18/Gemini_Generated_Image_9jy5v79jy5v79jy5.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+18/Gemini_Generated_Image_9jy5v89jy5v89jy5.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+18/Gemini_Generated_Image_9jy5v59jy5v59jy5.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+18/Gemini_Generated_Image_pwtkvipwtkvipwtk.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+19/Gemini_Generated_Image_j99y5uj99y5uj99y.jpeg",
        preview: true
      },
      {
        spotId: 19,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+19/Gemini_Generated_Image_beal15beal15beal.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+19/Gemini_Generated_Image_beal13beal13beal.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+19/Gemini_Generated_Image_irv8o5irv8o5irv8.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+19/Gemini_Generated_Image_fel7tifel7tifel7.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+20/Gemini_Generated_Image_svl4j2svl4j2svl4.jpeg",
        preview: true
      },
      {
        spotId: 20,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+20/Gemini_Generated_Image_svl4j4svl4j4svl4.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+20/Gemini_Generated_Image_svl4j1svl4j1svl4.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+20/Gemini_Generated_Image_nojyq5nojyq5nojy.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+20/Gemini_Generated_Image_moqv2vmoqv2vmoqv.jpeg",
        preview: false
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
