var e, t = chrome.runtime.getManifest().version,
    a = {
        scrape_status: "Finished",
        scrapped_items_arr: [],
        total_scrapped_page: 0,
        total_scrapped_count: 0,
        current_processed_count: 0,
        authUser: !1,
        authEmail: "",
        userRegistered: !1,
        active_search_tab_id: 0,
        last_status_check_time: ""
    },
    s = {
        search_change: !1,
        onExtMessage: function (t, o, r) {
            var n, c;
            switch (s.message = t, t.command) {
                case "saveUISettings":
                    a = t.data, s.saveUISettings(t.data, o, r);
                    break;
                case "console_logs_myApp":
                    e(t.title, t.msg);
                    break;
                case "stopAutoBotProcess":
                    s.stopAutoBotProcess(t.reason);
                    break;
                case "startSearchProcess":
                    s.startSearchProcess(t.data.Keywords_input, o, r);
                    break;
                case "registerProcess":
                    s.registerProcess(t.data, o, r);
                    break;
                case "updateProcess":
                    s.updateProcess(t.data, o, r);
                    break;
                case "updateOTPProcess":
                    s.updateOTPProcess(t.data, o, r);
                    break;
                case "checkAuthStatus":
                    s.checkAuthStatus(t.data, o, r);
                    break;
                case "downloadCSV":
                    s.downloadCSV(t.data, o, r);
                    break;
                case "checkSearchStatus":
                    n = !1, o && o.tab && o.tab.id && parseInt(o.tab.id) == parseInt(a.active_search_tab_id) && (n = !0), r({
                        is_search: n
                    });
                    break;
                case "startAutoBotProcess":
                    c = {
                        title: "G Map Extractor",
                        msg: "Auto bot proccess has been started"
                    }, s.create_notifications(c);
                    break;
                case "set_delay_in_bg":
                    setTimeout(function () {
                        r()
                    }, t.timeout);
                    break;
                case "getSettings":
                    "yes" == t.callback ? r({
                        uiSettings: a
                    }) : sendMessage(o, {
                        command: "rec_getSettings",
                        data: {
                            uiSettings: a
                        }
                    })
            }
            return !0
        },
        load: function () {
            s.initStorage()
        },
        initStorage: function (e) {
            chrome.storage.local.get("version", e => {
                const s = e.version;
                s != t ? (null == s || void 0 === s ? chrome.storage.local.set({
                    uiSettings: JSON.stringify(a)
                }, function () {
                    chrome.storage.local.get("uiSettings", e => {
                        a = JSON.parse(e.uiSettings)
                    })
                }) : chrome.storage.local.get("uiSettings", e => {
                    a = JSON.parse(e.uiSettings)
                }), chrome.storage.local.set({
                    version: t
                }, function () {})) : chrome.storage.local.get("uiSettings", e => {
                    a = JSON.parse(e.uiSettings)
                })
            }), chrome.storage.local.get("UUID", e => {
                const t = e.UUID;
                null != t && "" != t || chrome.storage.local.set({
                    UUID: generateUUID()
                }, function () {})
            })
        },
        saveUISettings: function (e, t, s) {
            chrome.storage.local.set({
                uiSettings: JSON.stringify(a)
            }, function () {}), "function" == typeof s && s({
                uiSettings: a
            })
        },
        create_notifications: function (e) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "images/default_icon_16.png",
                title: e.title,
                message: e.msg
            }, function () {
                chrome.runtime.lastError
            })
        },
        startSearchProcess: function (e, t, o) {
            a.active_search_tab_id = 0, a.current_processed_count = 0, a.scrape_status = "Finished", a.scrapped_items_arr = [], a.search_keyword = "", s.saveUISettings();
            var r = atob("aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT0=") + encodeURIComponent(e) + "&tbm=lcl";
            chrome.tabs.create({
                url: r
            }, function (t) {
                a.scrape_status = "Inprogress", a.current_processed_count = 0, a.active_search_tab_id = t.id, a.search_keyword = e, s.saveUISettings()
            })
        },
        stopAutoBotProcess: function (e) {
            var t;
            a.scrapped_items_arr.length > 0 ? s.downloadCSV() : (t = {
                title: "G Map Extractor",
                msg: "No data found! Auto bot process has been stopped."
            }, s.create_notifications(t)), "next_profile_not_found" == e ? (t = {
                title: "G Map Extractor",
                msg: "Successfully Data scrapped and downloading CSV file has been started."
            }, s.create_notifications(t)) : "register_required" == e ? (t = {
                title: "G Map Extractor",
                msg: "Auto bot process has been stopped and downloading CSV file has been started. You need to register for more scrape data."
            }, s.create_notifications(t)) : "user_not_approved" == e ? (t = {
                title: "G Map Extractor",
                msg: "Auto bot process has been stopped and downloading CSV file has been started. You are not registered or your account is not approved for more scrape data."
            }, s.create_notifications(t)) : "manual_stop" == e && (t = {
                title: "G Map Extractor",
                msg: "Auto bot process has been stopped and downloading CSV file has been started."
            }, s.create_notifications(t)), sendMessage(a.active_search_tab_id, {
                command: "removeBlocker"
            }, function (e) {}), a.scrape_status = "Finished", a.active_search_tab_id = 0, s.saveUISettings(), sendMessage("", {
                command: "updateScrapeState"
            }, function (e) {})
        },
        registerProcess: function (e, t, o) {
            a.userRegistered = !0, a.authEmail = e.email;
            // chrome.storage.local.get("UUID", t => {
            //     const r = t.UUID;
            //     $.ajax({
            //         url: atob(consts.baurl) + atob(consts.raurl),
            //         type: "POST",
            //         data: {
            //             NAME: e.name,
            //             EMAIL: e.email,
            //             PASS: e.password,
            //             MACHINE: r
            //         },
            //         cache: !1,
            //         success: function (t) {
            //             o(t), t && t == atob("cmVzaXN0ZXJk") && (a.userRegistered = !0, a.authEmail = e.email, s.saveUISettings())
            //         },
            //         error: function (e) {
            //             o(e.statusText || e.responseText || ""), a.userRegistered = !1, s.saveUISettings()
            //         }
            //     })
            // })
        },
        updateProcess: function (e, t, a) {
            // chrome.storage.local.get("UUID", t => {
            //     const s = t.UUID;
            //     $.ajax({
            //         url: atob(consts.baurl) + atob(consts.uaurl),
            //         type: "POST",
            //         data: {
            //             producttype: e.name,
            //             email: e.email,
            //             machineid: s
            //         },
            //         cache: !1,
            //         success: function (e) {
            //             a(e)
            //         },
            //         error: function (e) {
            //             a(e.statusText || e.responseText || "")
            //         }
            //     })
            // })
        },
        updateOTPProcess: function (e, t, a) {
           a(e);
            // chrome.storage.local.get("UUID", t => {
            //     const s = t.UUID;
            //     $.ajax({
            //         url: atob(consts.baurl) + atob(consts.uourl),
            //         type: "POST",
            //         data: {
            //             email: e.email,
            //             machineid: s,
            //             producttype: e.name,
            //             otppass: e.otp
            //         },
            //         cache: !1,
            //         success: function (e) {
            //             a(e)
            //         },
            //         error: function (e) {
            //             a(e.statusText || e.responseText || "")
            //         }
            //     })
            // })
        },
        checkAuthStatus: function (e, t, o) {
            a.authUser = !0 ;
            // chrome.storage.local.get("UUID", e => {
            //     const t = e.UUID;
            //     $.ajax({
            //         url: atob(consts.baurl) + atob(consts.casurl),
            //         type: "POST",
            //         data: {
            //             MACHINE: t
            //         },
            //         cache: !1,
            //         success: function (e) {
            //             o(e), e && e == atob("MQ==") ? a.authUser = !0 : a.authUser = !1, s.saveUISettings()
            //         },
            //         error: function (e) {
            //             o(e.statusText || e.responseText || "")
            //         }
            //     })
            // })
        },
        downloadCSV: function () {
            var e = new Date,
                t = e.getDate() + "-" + (e.getMonth() + 1) + " " + e.getFullYear(),
                o = "items_data_" + t;
            "" != a.search_keyword && a.search_keyword && (o = a.search_keyword + "_" + t), s.V2JSONToCSVConvertor(a.scrapped_items_arr, o, !0)
        },
        V2JSONToCSVConvertor: function (e, t, a) {
            var o, r, n, c, i, u = "object" != typeof e ? JSON.parse(e) : e,
                d = "";
            if (a) {
                for (r in o = "", u[0]) o += s.getKeyFromMap(r) + ",";
                d += (o = o.slice(0, -1)) + "\r\n"
            }
            for (n = 0; n < u.length; n++) {
                for (r in o = "", u[n]) u[n][r], o += '"' + (void 0 === u[n][r] ? "" : (u[n][r] + "").toString().replace(/["]/gi, "'")) + '",';
                o.slice(0, o.length - 1), d += o + "\r\n"
            }
            "" != d ? (c = "", c += t.replace(/ /g, "_"), i = "data:text/csv;charset=utf-8," + escape(d), chrome.downloads.download({
                url: i,
                filename: "G_Map_Extractor/" + c + ".csv"
            })) : alert("Invalid data")
        },
        getKeyFromMap: function (e) {
            return {
                name: "Name",
                address: "Address",
                zip: "Zip Code",
                latitude: "Latitude",
                phone_number: "Phone Number",
                email: "Email",
                website: "Website",
                longitude: "Longitude"
            } [e] || e
        },
        getParameterByName: function (e, t) {
            t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
            var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return a ? a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "" : null
        },
        updateQueryStringParameter: function (e, t, a) {
            var s = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                o = -1 !== e.indexOf("?") ? "&" : "?";
            return e.match(s) ? e.replace(s, "$1" + t + "=" + a + "$2") : e + o + t + "=" + a
        }
    };

function sendMessage(e, t) {
    e ? chrome.tabs.sendMessage(e, t) : chrome.runtime.sendMessage(t)
}

function generateUUID() {
    var e = (new Date).getTime(),
        t = performance && performance.now && 1e3 * performance.now() || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var s = 16 * Math.random();
        return e > 0 ? (s = (e + s) % 16 | 0, e = Math.floor(e / 16)) : (s = (t + s) % 16 | 0, t = Math.floor(t / 16)), ("x" === a ? s : 3 & s | 8).toString(16)
    })
}

function PopupCenter(e, t, a, s) {
    var o = null != window.screenLeft ? window.screenLeft : screen.left,
        r = null != window.screenTop ? window.screenTop : screen.top,
        n = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
        c = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
        i = n / 2 - a / 2 + o,
        u = c / 2 - s / 2 + r,
        d = window.open(e, t, "scrollbars=yes, width=" + a + ", height=" + s + ", top=" + u + ", left=" + i);
    window.focus && d.focus()
}
chrome.runtime.onMessage.addListener(s.onExtMessage), s.load(), e = function (e, t) {}, chrome.tabs.onRemoved.addListener(function (e, t) {
    a.active_search_tab_id == e && (s.stopAutoBotProcess("manual_stop"), sendMessage("", {
        command: "updateScrapeState"
    }, function (e) {}))
}), chrome.alarms.clear(chrome.runtime.getManifest().name + "_auth_alarm", function () {}), chrome.browserAction.onClicked.addListener(function (e) {
    PopupCenter(chrome.runtime.getURL("html/index.html"), "G Map Extractor", 1300, 800)
});