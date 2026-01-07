const express = require("express");
const router = express.Router();
const ownermodel = require("../models/owner-model");

router.get("/admin", (req, res) => {
    let success=req.flash("success");
    res.render("createproduct",{success});
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            const owners = await ownermodel.find();

            if (owners.length > 0) {
                return res.status(403).send(
                    "You don't have permission to create a new owner"
                );
            }

            const { fullname, email, password } = req.body || {};

            if (!fullname || !email || !password) {
                return res.status(400).send("All fields are required");
            }

            const createdOwner = await ownermodel.create({
                fullname,
                email,
                password
            });

            res.status(201).json(createdOwner);

        } catch (error) {
            res.status(500).send("Server error");
        }
    });
}

module.exports = router;
