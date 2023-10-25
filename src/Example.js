import React, { useEffect } from 'react'

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

const Example = () => {

    const newdata = [
        {
            "user_id": "oMUa4mYILdZBOdTohgKjlX8Si4aYD0ZG",
            "_id": "aXYISY5DJNGbdRqSKobKRWJP8fLX8cJZ"
        },
        {
            "user_id": "1hu069JJGOFiEfMPO91irbAL2r3IDwhI",
            "_id": "MWM49ri4iZ4DWljyDj6JG0fjllCA8U0u"
        },
        {
            "user_id": "JUhLPJHs4fjdqJDT8vJPXI0FpFGFSRp0",
            "_id": "mtdUW8Ca1N8gyEt0NRnJw0HryHid8Bmj"
        },
        {
            "user_id": "u1u2rzBnkQmgh65lpOjLGPvzLCVkiEmh",
            "_id": "fONGSW5jsrOnFnzZiKHqb5OD3Dng3bav"
        },
        {
            "user_id": "mEfzLJJHsamrALOy4aoHrFgfnVUhiZkP",
            "_id": "vKZRcVnh2tXphGnwWV1OOwNMajpaspxm"
        },
        {
            "user_id": "PnuCS7hYOmNM9QCIis710yjjMBINeJI0",
            "_id": "ICNxGTm2CJiesCyr3fM6QHTl3BTvx1ib"
        },
        {
            "user_id": "GIVZdAnkzyBL3aZeL5PklQW6RRUKdD0E",
            "_id": "c7zdNXP5e6sGNDamS80ur18ZOHczSa0V"
        },
        {
            "user_id": "EKqYaZQBpMSYGtHKIJJ14FAAlYAUC4Oy",
            "_id": "mOBVBBXXLb0qfCA6QaTykveujbtDWHaG"
        },
        {
            "user_id": "wPrlX1oYBKbppDjuJjbyBZMJZQnrg49K",
            "_id": "eFDg8mkXFIHoRMJzc70oKT4v60QWYTre"
        },
        {
            "user_id": "pfLFss6gKLlDDc3LvTQm8A5JSX8O8Db8",
            "_id": "EJKfVkYFtnI2WDxAQ7K2bxB3guDqAiP0"
        },
        {
            "user_id": "CoR0Cff5U3QW1rqOcQRLezEWEnjcYq9K",
            "_id": "QYI0oM8oCEcGOkTqk1My01ijXkNvwKfZ"
        },
        {
            "user_id": "k9iceQpnT5yIv1BBgPJ3uTfUGuNozDHg",
            "_id": "DgWS4RBc8qPflX8OgUESSCX3pBG1TVGd"
        },
        {
            "user_id": "T7b04D2qCBE3StPpwv1vgqmnJeWzzCNi",
            "_id": "txu017IC34ewrxYw6gJAwBgF1o4Ce4Bs"
        },
        {
            "user_id": "Siy2y4mPbecyjuWSpTWKhitjIPqH61Ft",
            "_id": "UBCxf3dNP6x1Ug8OvBOU0rlH4lTpfWas"
        },
        {
            "user_id": "EgzkrfVgr1hXoIUeERXJw3TOO2TPv7Li",
            "_id": "izv6Iuq33sDXPEMedkFMk6vfECobOjc6"
        },
        {
            "user_id": "lpoCn45xH9Bgka5pXYLiCc1e8vFLws7e",
            "_id": "h02yCizFM4pQ5zeO9kzGSGApXS8MFupz"
        },
        {
            "user_id": "3C0WK0v0AvAR09QArGMYAWaywdKXgWiw",
            "_id": "bTaNNssrtSqrEAmqtJF9X95oYX6ABFxL"
        },
        {
            "user_id": "qkyDqc36MbmnBLfWTJgVOgBoczpOh1oP",
            "_id": "OpXAug4v9L3k65jeEBgezzN9oyHt9Lth"
        },
        {
            "user_id": "7HQcPpRlOwdh8iNT2YoCsPLoSrS1o1Bq",
            "_id": "HuL1Wy5Nzq9goHY230JNyFDf1ZcKQxdm"
        },
        {
            "user_id": "PkToTLTCgZ3YPdcUX5Cqi83hUdwa3X5P",
            "_id": "CZNwe5MRRN1GxfBG4Eor5gvuFW4rcnjt"
        }
    ]

    const ArrayData = () => {
        var arr = [];
        for (let i = 0; i < newdata?.length; i++) {
            if (newdata[i]?.user_id === data[i]?._id) {
                const obj = {
                    save: newdata[i],
                    user: data[i]
                }
                arr.push(obj)
            }
        }
        return arr
    }
    // console.log(ArrayData())


    function mergeArrays(array1, array2) {
        const mergedArray = [];

        array1.forEach((obj1) => {
            const matchingObj2 = array2.find((obj2) => obj2?._id === obj1?.user_id);
            console.log(matchingObj2);

            if (matchingObj2) {
                const mergedObj = {
                    saved: obj1,
                    blog: matchingObj2
                };
                mergedArray.push(mergedObj);
            } else {
                // If no match is found, you can skip the element or include it with a default value
                // mergedArray.push(obj1);
            }
        });

        return mergedArray;
    }

    // Example usage
    const array1 = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Mike' },
    ];

    const array2 = [
        { id: 1, age: 25 },
        { id: 2, age: 30 },
    ];

    const mergedArray = mergeArrays(newdata, data);
    console.log(mergedArray);

    return (
        <div>Example</div>
    )
}

export default Example;


const data = [
    {
        "_id": "oMUa4mYILdZBOdTohgKjlX8Si4aYD0ZG",
        "first_name": "Nicky",
        "last_name": "Vesco",
        "email": "nvesco0@slashdot.org",
        "gender": "Male",
        "ip_address": "164.138.214.159"
    },
    {
        "_id": "1hu069JJGOFiEfMPO91irbAL2r3IDwhI",
        "first_name": "Murdock",
        "last_name": "Sellan",
        "email": "msellan1@ucsd.edu",
        "gender": "Agender",
        "ip_address": "115.64.175.17"
    },
    {
        "_id": "JUhLPJHs4fjdqJDT8vJPXI0FpFGFSRp0",
        "first_name": "Shurlock",
        "last_name": "Littledyke",
        "email": "slittledyke2@vkontakte.ru",
        "gender": "Male",
        "ip_address": "113.83.52.84"
    },
    {
        "_id": "u1u2rzBnkQmgh65lpOjLGPvzLCVkiEmh",
        "first_name": "Vilhelmina",
        "last_name": "Canter",
        "email": "vcanter3@nature.com",
        "gender": "Female",
        "ip_address": "242.86.89.151"
    },
    {
        "_id": "mEfzLJJHsamrALOy4aoHrFgfnVUhiZkP",
        "first_name": "Ulises",
        "last_name": "Innes",
        "email": "uinnes4@weather.com",
        "gender": "Male",
        "ip_address": "47.183.195.24"
    },
    {
        "_id": "PnuCS7hYOmNM9QCIis710yjjMBINeJI0",
        "first_name": "Ashley",
        "last_name": "Guest",
        "email": "aguest5@sourceforge.net",
        "gender": "Male",
        "ip_address": "19.237.95.79"
    },
    {
        "_id": "GIVZdAnkzyBL3aZeL5PklQW6RRUKdD0E",
        "first_name": "Maynord",
        "last_name": "Furlonge",
        "email": "mfurlonge6@blinklist.com",
        "gender": "Male",
        "ip_address": "192.182.122.124"
    },
    {
        "_id": "EKqYaZQBpMSYGtHKIJJ14FAAlYAUC4Oy",
        "first_name": "Lin",
        "last_name": "Skyram",
        "email": "lskyram7@angelfire.com",
        "gender": "Male",
        "ip_address": "182.152.62.229"
    },
    {
        "_id": "wPrlX1oYBKbppDjuJjbyBZMJZQnrg49K",
        "first_name": "Lissy",
        "last_name": "Cano",
        "email": "lcano8@dyndns.org",
        "gender": "Female",
        "ip_address": "153.108.24.245"
    },
    {
        "_id": "pfLFss6gKLlDDc3LvTQm8A5JSX8O8Db8",
        "first_name": "Millard",
        "last_name": "Cassidy",
        "email": "mcassidy9@opera.com",
        "gender": "Male",
        "ip_address": "71.130.6.234"
    },
    {
        "_id": "CoR0Cff5U3QW1rqOcQRLezEWEnjcYq9K",
        "first_name": "Nicky",
        "last_name": "Vesco",
        "email": "nvesco0@slashdot.org",
        "gender": "Male",
        "ip_address": "164.138.214.159"
    },
    {
        "_id": "k9iceQpnT5yIv1BBgPJ3uTfUGuNozDHg",
        "first_name": "Murdock",
        "last_name": "Sellan",
        "email": "msellan1@ucsd.edu",
        "gender": "Agender",
        "ip_address": "115.64.175.17"
    },
    {
        "_id": "T7b04D2qCBE3StPpwv1vgqmnJeWzzCNi",
        "first_name": "Shurlock",
        "last_name": "Littledyke",
        "email": "slittledyke2@vkontakte.ru",
        "gender": "Male",
        "ip_address": "113.83.52.84"
    },
    {
        "_id": "Siy2y4mPbecyjuWSpTWKhitjIPqH61Ft",
        "first_name": "Vilhelmina",
        "last_name": "Canter",
        "email": "vcanter3@nature.com",
        "gender": "Female",
        "ip_address": "242.86.89.151"
    },
    {
        "_id": "EgzkrfVgr1hXoIUeERXJw3TOO2TPv7Li",
        "first_name": "Ulises",
        "last_name": "Innes",
        "email": "uinnes4@weather.com",
        "gender": "Male",
        "ip_address": "47.183.195.24"
    },
    {
        "_id": "lpoCn45xH9Bgka5pXYLiCc1e8vFLws7e",
        "first_name": "Ashley",
        "last_name": "Guest",
        "email": "aguest5@sourceforge.net",
        "gender": "Male",
        "ip_address": "19.237.95.79"
    },
    {
        "_id": "3C0WK0v0AvAR09QArGMYAWaywdKXgWiw",
        "first_name": "Maynord",
        "last_name": "Furlonge",
        "email": "mfurlonge6@blinklist.com",
        "gender": "Male",
        "ip_address": "192.182.122.124"
    },
    {
        "_id": "qkyDqc36MbmnBLfWTJgVOgBoczpOh1oP",
        "first_name": "Lin",
        "last_name": "Skyram",
        "email": "lskyram7@angelfire.com",
        "gender": "Male",
        "ip_address": "182.152.62.229"
    },
    {
        "_id": "7HQcPpRlOwdh8iNT2YoCsPLoSrS1o1Bq",
        "first_name": "Lissy",
        "last_name": "Cano",
        "email": "lcano8@dyndns.org",
        "gender": "Female",
        "ip_address": "153.108.24.245"
    },
    {
        "_id": "PkToTLTCgZ3YPdcUX5Cqi83hUdwa3X5P",
        "first_name": "Millard",
        "last_name": "Cassidy",
        "email": "mcassidy9@opera.com",
        "gender": "Male",
        "ip_address": "71.130.6.234"
    }
]