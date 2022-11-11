const express = require("express");
const uuid = require("uuid");
const router = express.Router();
let members = require("../../Members");

// GET all members
router.get("/", (req, res) => res.json(members));

// GET single member
router.get("/:id", (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));
	if (found) {
		res.json(members.filter((member) => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({msg: `No member with the id of ${req.params.id}`});
	}
});

// CREATE member
router.post("/", (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		age: req.body.age,
		status: "unknown",
	};

	if (!newMember.name || !newMember.age) {
		return res.status(400).json({msg: "Please include name and age"});
	}

	members.push(newMember);
	res.redirect("/");
	// res.json(members);
});

// UPDATE member
router.put("/:id", (req, res) => {
	const found = members.some(
		(member) => member.id.toString() === req.params.id
	);
	if (found) {
		const updatedMember = req.body;
		members.forEach((member) => {
			if (member.id.toString() === req.params.id) {
				member.name = updatedMember.name ? updatedMember.name : member.name;
				member.age = updatedMember.age ? updatedMember.age : member.age;
				res.json({msg: "Member was updated", member});
			}
		});
	} else {
		res.status(400).json({msg: `No member with the id of ${req.params.id}`});
	}
});

// DELETE single member
router.delete("/:id", (req, res) => {
	const found = members.some(
		(member) => member.id.toString() === req.params.id
	);
	if (found) {
		members = members.filter(
			(member) => member.id.toString() !== req.params.id
		);
		res.json({msg: "Member deleted", members});
	} else {
		res.status(400).json({msg: `No member with the id of ${req.params.id}`});
	}
});

module.exports = router;
