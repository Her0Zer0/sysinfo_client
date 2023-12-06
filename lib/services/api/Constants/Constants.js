module.exports = {
    title: process.env.APP_TITLE,
    menu: [
        {
            id: "si-general",
            label: "General",
            help: "Information about the overall system in a consumable glance",
            ref: "/si/general"
        },
        {
            id: "si-settings",
            label: "Settings",
            help: "Setup settings and command center server",
            ref: "/si/settings"
        },
    ]
}