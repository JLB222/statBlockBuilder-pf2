document.querySelector('#submitButton').addEventListener('click', createCreature)

function createCreature() {
    let creature = {
        name: document.querySelector('#name').value,
        id: +document.querySelector('#creatureId').value,
        source: document.querySelector('#source').value,
        level: +document.querySelector('#level').value,
        tags: document.querySelector('#tags').value.split(","),
        recallKnowledgeCategory: document.querySelector('#recallKnowledgeCategory').value,
        recallKnowledgeDC: document.querySelector('#recallKnowledgeDC').value.split(",").map(Number),  
        perception: +document.querySelector('#perception').value,
        vision: document.querySelector('#vision').value,
        otherSenses: document.querySelector('#otherSenses').value.split(","),
        languages: document.querySelector('#languages').value.split(","),

        skillBonusAcrobatics: +document.querySelector('#acrobatics').value || 0,
        skillBonusArcana: +document.querySelector('#arcana').value || 0,
        skillBonusAthletics: +document.querySelector('#athletics').value || 0,
        skillBonusCrafting: +document.querySelector('#crafting').value || 0,
        skillBonusDeception: +document.querySelector('#deception').value || 0,
        skillBonusDiplomacy: +document.querySelector('#diplomacy').value || 0,
        skillBonusIntimidation: +document.querySelector('#intimidation').value || 0,
        skillBonusLore: {Warfare: 30},
        skillBonusMedicine: +document.querySelector('#medicine').value || 0,
        skillBonusNature: +document.querySelector('#nature').value || 0,
        skillBonusOccultism: +document.querySelector('#occultism').value || 0,
        skillBonusPerformance: +document.querySelector('#performance').value || 0,
        skillBonusReligion: +document.querySelector('#religion').value || 0,
        skillBonusSociety: +document.querySelector('#society').value || 0,
        skillBonusStealth: +document.querySelector('#stealth').value || 0,
        skillBonusSurvival: +document.querySelector('#survival').value || 0,
        skillBonusThievery: +document.querySelector('#thievery').value || 0,

        abilityModStrength: +document.querySelector('#strength').value,
        abilityModDexterity: +document.querySelector('#dexterity').value,
        abilityModConstitution: +document.querySelector('#constitution').value,
        abilityModIntelligence: +document.querySelector('#intelligence').value,
        abilityModWisdom: +document.querySelector('#wisdom').value,
        abilityModCharisma: +document.querySelector('#charisma').value,

        defenseHP: +document.querySelector('#HP').value,
        defenseAC: +document.querySelector('#AC').value,
        defenseFortSave: +document.querySelector('#FORT').value,
        defenseRflxSave: +document.querySelector('#RFLX').value,
        defenseWillSave: +document.querySelector('#WILL').value,
        defenseImmunities: document.querySelector('#Immunities').value.split(","),
        defenseResistances: document.querySelector('#Resistances').value.split(","),
        defenseWeaknesses: document.querySelector('#Weaknesses').value.split(","),

        speeds: {
            stride: +document.querySelector('#Stride').value,
            climb: +document.querySelector('#Climb').value,
            swim: +document.querySelector('#Swim').value,
            fly: +document.querySelector('#Fly').value,
            burrow: +document.querySelector('#Burrow').value
        },
        canReactiveStrike: document.querySelector('#reactiveStrike').value === 'true',  // this 'converts' the 'true' or 'false' strings given by the <option> element to boolean true or false.  'true' === 'true' evaluates true and 'false' === 'true' would evaluate false
        strikes: [
            {
                type: "whether it is melee or ranged",
                weapon: "Fist, Claw, Tail, etc",
                weaponTraits: [""],
                numberOfActions: 1,
                attackBonuses: [10,5,0],  //usually formatted as +x[+y/+z]
                diceNumber: 0,
                diceSize: 0,
                damageBonus: 0,
                damageType: "Bludgeoning",
                rider: [
                    {
                        type: "extraDamage",
                        riderDiceNumber: 0,
                        riderDiceSize: 0,
                        riderDamageBonus: 0,
                        riderDamageType: "rider damage's type"
                    },
                    {
                        type: "effect",
                        riderName: "name of rider effect",
                    }
                ]
            }
        ],
        spellSaveDC: +document.querySelector('#SpellSaveDC').value || 0,  //setting this to 0 for creatures with no spells ensures that the spell column is not rendered 
        rituals: [
            {
                name: "",
                ritualRank: 1
            }
        ],
        spells: [
            {
                name: "",
                spellRank: 0,
                tradition: "Arcane, Divine, Occult, or Primal",
                innate: true,
                numberOfUses: 1,
            }
        ],
        spellsAtWill: [
            {
                name: "",
                spellRank: 0,
                tradition: "Arcane, Divine, Occult, or Primal",
                innate: true,
            },
        ],
        spellsConstant: [
            {
                name: "",
                spellRank: 0,
                tradition: "Arcane, Divine, Occult, or Primal",
                innate: true,
            }
        ],
        specialAbilities: [
            {
                name: "Attach",
                type: "Passive",
                traits: [],
                dc: null,
                description: "When a bloodseeker hits a target larger than itself, its barbed legs attach it to that creature. This is similar to grabbing the creature, but the bloodseeker moves with that creature rather than holding it in place. The bloodseeker is flat-footed while attached. If the bloodseeker is killed or pushed away while attached to a creature it has drained blood from, that creature takes 1 persistent bleed damage. Escaping the attach or removing the bloodseeker in other ways doesn’t cause bleed damage."
            },
            {
                name: "Blood Drain",
                type: "Activity",
                numberOfActions: 1,
                traits: [],
                requirements: "The bloodseeker is attached to a creature.",
                description: "The bloodseeker uses its proboscis to drain blood from the creature it’s attached to. This deals 1d4 damage, and the bloodseeker gains temporary Hit Points equal to the damage dealt. A creature that has its blood drained by a bloodseeker is drained 1 until it receives healing (of any kind or amount).",
                diceNumber: 1,
                diceSize: 4,
                damageBonus: 0,
                damageType: "",
            },
            {
                name: "Rejection Vulnerability",
                type: "Demon Vulnerability",
                damageTaken: [2,6,0,"Mental"],
                description: "As succubi are beings of pure lust, creatures that reject their lust can metaphysically harm them. When a succubus fails a Diplomacy check to Embrace or Request, or when a creature succeeds at its save against a succubus’s mental spell or ability, the succubus takes 2d6 mental damage. For one hour after causing mental damage to a succubus in this way, a creature can deal 2d6 mental damage to the succubus with a successful Demoralize incorporating its rejection.",
            },
            {
                name: "Seductive Presence",
                type: "Aura",
                auraSize: 10,
                traits: ["Aura", "Charm", "Emotion", "Mental"],
                description: "Any creature in the aura that could be sexually attracted to a succubus takes a –2 circumstance penalty to checks and DCs to oppose the succubus’s mental spells, Deception, and Diplomacy."
            },
            {
                name: "Attack of Opportunity",
                type: "Reaction",
                trigger: "A creature within the monster's reach uses a manipulate action or a move action, makes a ranged attack, or leaves a square during a move action it's using.",
                effect: "The monster attempts a melee Strike against the triggering creature. If the attack is a critical hit and the trigger was a manipulate action, the monster disrupts that action. This Strike doesn't count toward the monster's multiple attack penalty, and its multiple attack penalty doesn't apply to this Strike.",
            },
            {
                name: "Burning Hoofprints",
                type: "Activity",
                numberOfActions: 2,
                traits: ["Divine", "Fire", "Unholy"],
                description: "The vordine Strides, trailing hoofprints in each square they exit. The hoofprints burn for 1 minute. A creature on the ground that enters a square with burning hoofprints or begins its turn in one takes 1d4 fire damage.",
                diceNumber: 1,
                diceSize: 4,
                damageBonus: 0,
                damageType: "Fire",
            }

        ],
        items: ["Crossbow"],
        notes: [

        ]
    }
    console.log(creature)
    document.querySelector("#output").textContent = JSON.stringify(creature, null, 2)
}

//consider assigning skill values as either the given skill bonus || the appropriate ability modifier bonus, since untrained skills still use the creature's base stats on skill checks