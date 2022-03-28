var e = "#register_error_msg",
    a = "#loading_section",
    s = {
        uiSettings: {},
        load: function () {
            s.addEvents()
        },
        addEvents: function () {
            $(document).on("click", ".close-popup", function (e) {
                self.close()
            }), $(document).on("submit", "#register-form", function (t) {
                var r, i, n, c;
                return t.preventDefault(), i = (r = $(this)).find("#user_email_input"), n = r.find("#reference_id"), $(e).hide(), $("#registerResSection").hide(), r.find('[type="submit"]'), "" == i.val() ? ($(e).text("You need to Enter a email"), $(e).show(), i.parent().addClass("has-error"), i.focus(), !1) : 0 == s.validateEmail(i.val()) ? ($(e).text("You need to Enter a valid email"), $(e).show(), i.parent().addClass("has-error"), i.focus(), !1) : (i.parent().removeClass("has-error"), $(a).show(), r.find('[type="submit"]').attr("disabled", "disabled"), (c = {}).name = "Google Map Extractor", c.email = i.val(), c.password = n.val(), void sendMessage({
                    command: "registerProcess",
                    data: c
                }, function (e) {
                    $(a).hide(), r.find('[type="submit"]').removeAttr("disabled"), $("#registerResSection").show(), e && e == atob("cmVzaXN0ZXJk") ? (r[0].reset(), $("#registerResSection").html('<div class="alert alert-success alert-dismissible text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Thank you!</strong> <br><br> <i class="fa fa-check-circle"></i> Your account has been registered successfully. <br> Click here to <a href="index.html"> Start Process </a>. </div>')) : $("#registerResSection").html('<div class="alert alert-danger alert-dismissible text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> <i class="fa fa-times"></i> ' + e + ".</div>")
                }))
            })
        },
        validateEmail: function (e) {
            var a = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
                s = a.test(e);
            return !!s
        }
    };

function sendMessage(e, a) {
    null != a && (e.callback = "yes"), chrome.runtime.sendMessage(e, a)
}

function sendMessageActiveTab(e, a) {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function (s) {
        chrome.tabs.sendMessage(s[0].id, e, a)
    })
}

function handleMessage(e, a) {
    switch (e.command) {
        case "rec_getSettings":
            s.uiSettings = e.data.uiSettings;
            break;
        case "updateScrapeState":
            s.updateScrapeState()
    }
    void 0 !== e.data && void 0 !== e.data.callback && "yes" == e.data.callback && (callback(), callback = null)
}
$(document).ready(function () {
    s.load(), chrome.runtime.onMessage.addListener(handleMessage)
});