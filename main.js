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
        strikes: [],
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
    let numOfStrikes = document.getElementById('Strikes').value
    for (let i = 1; i <= numOfStrikes; i++) {
        creature.strikes.push(createStrike(i))
    }
    console.log(creature)
    document.querySelector("#output").textContent = JSON.stringify(creature, null, 2)
}


// Strikes //
document.getElementById('strikeButton').addEventListener('click', addStrikeFields)
function addStrikeFields() {
    let numOfFields = document.getElementById('Strikes').value
    for (let i = 0; i < numOfFields; i++) {
        let strikeNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `strike${strikeNumber}`

        let newInputType = document.createElement('input')
        newInputType.id = `strike${strikeNumber}Type`
        newInputType.placeholder = `Melee or Ranged?`
        newInputType.type = "text"

        let newInputWeapon = document.createElement('input')
        newInputWeapon.id = `strike${strikeNumber}Weapon`
        newInputWeapon.placeholder = `Claw? Bow? Tail? Sword?`
        newInputWeapon.type = "text"

        let newInputWeaponTraits = document.createElement('input')
        newInputWeaponTraits.id = `strike${strikeNumber}WeaponTraits`
        newInputWeaponTraits.placeholder = `weapon's traits?`
        newInputWeaponTraits.type = "text"

        let newInputAttackBonuses = document.createElement('input')
        newInputAttackBonuses.id = `strike${strikeNumber}AttackBonuses`
        newInputAttackBonuses.placeholder = `their MAP`
        newInputAttackBonuses.type = "text"

        let newInputDiceNumber = document.createElement('input')
        newInputDiceNumber.id = `strike${strikeNumber}DiceNumber`
        newInputDiceNumber.placeholder = `# of dmg dice`
        newInputDiceNumber.type = "number"

        let newInputDiceSize = document.createElement('input')
        newInputDiceSize.id = `strike${strikeNumber}DiceSize`
        newInputDiceSize.placeholder = `size of dmg dice`
        newInputDiceSize.type = "number"

        let newInputDamageBonus = document.createElement('input')
        newInputDamageBonus.id = `strike${strikeNumber}DamageBonus`
        newInputDamageBonus.placeholder = `flat dmg bonus`
        newInputDamageBonus.type = "number"

        let newInputDamageType = document.createElement('input')
        newInputDamageType.id = `strike${strikeNumber}DamageType`
        newInputDamageType.placeholder = `type of dmg`
        newInputDamageType.type = "text"

        //Adds rider div, dropdown options, & button to create rider inputs
        let newDivRiderFields = document.createElement('div')
        let newSelectHasRiders = document.createElement('select')
        newSelectHasRiders.id = `strike${strikeNumber}HasRider`

        let newOptionHasRider = document.createElement('option')
        newOptionHasRider.innerText = `Has riders?`
        newOptionHasRider.value = false

        let newOptionHas1rider = document.createElement('option')
        newOptionHas1rider.innerText = `1`
        newOptionHas1rider.value = `1`

        let newOptionHas2rider = document.createElement('option')
        newOptionHas2rider.innerText = `2`
        newOptionHas2rider.value = `2`

        let newOptionHas3rider = document.createElement('option')
        newOptionHas3rider.innerText = `3`
        newOptionHas3rider.value = `3`

        let newButtonCreateRiderFields = document.createElement('button')
        newButtonCreateRiderFields.id = `createRiderFieldsForStrike${strikeNumber}`
        newButtonCreateRiderFields.innerText = 'Confirm'
        newButtonCreateRiderFields.onclick = () => addRiderFields((strikeNumber), +newSelectHasRiders.value)
        
        newDiv.appendChild(newInputType)
        newDiv.appendChild(newInputWeapon)
        newDiv.appendChild(newInputWeaponTraits)
        newDiv.appendChild(newInputAttackBonuses)
        newDiv.appendChild(newInputDiceNumber)
        newDiv.appendChild(newInputDiceSize)
        newDiv.appendChild(newInputDamageBonus)
        newDiv.appendChild(newInputDamageType)
        newDiv.appendChild(newDivRiderFields)
            newDivRiderFields.appendChild(newSelectHasRiders)
                newSelectHasRiders.appendChild(newOptionHasRider)
                newSelectHasRiders.appendChild(newOptionHas1rider)
                newSelectHasRiders.appendChild(newOptionHas2rider)
                newSelectHasRiders.appendChild(newOptionHas3rider)
        newDiv.appendChild(newButtonCreateRiderFields)

        document.getElementById('strikeFields').appendChild(newDiv)
    }
}

function createStrike(strikeNum) {
    let strike = {
        type: document.getElementById(`strike${strikeNum}Type`).value,
        weapon: document.getElementById(`strike${strikeNum}Weapon`).value,
        weaponTraits: document.getElementById(`strike${strikeNum}WeaponTraits`).value.split(","),
        attackBonuses: document.getElementById(`strike${strikeNum}AttackBonuses`).value.split(",").map(Number) || 0,
        diceNumber: +document.getElementById(`strike${strikeNum}DiceNumber`).value,
        diceSize: +document.getElementById(`strike${strikeNum}DiceSize`).value,
        damageBonus: +document.getElementById(`strike${strikeNum}DamageBonus`).value,
        damageType: document.getElementById(`strike${strikeNum}DamageType`).value,
    }

    let numberOfRiders = document.getElementById(`strike${strikeNum}HasRider`).value
    numberOfRiders > 0 ? strike.rider = [] : null
    for (let i = 1; i <= numberOfRiders; i++) {
        strike.rider.push(createRider(strikeNum, i))
    }
    return strike
}

function createRider(strikeNumber, riderNumber) {
    let riderDetails = {
        riderName: document.getElementById(`strike${strikeNumber}Rider${riderNumber}Name`).value,
        type: document.getElementById(`strike${strikeNumber}Rider${riderNumber}Type`).value,
        riderDiceNumber: +document.getElementById(`strike${strikeNumber}Rider${riderNumber}DiceNumber`).value,
        riderDiceSize: +document.getElementById(`strike${strikeNumber}Rider${riderNumber}DiceSize`).value,
        riderDamageBonus: +document.getElementById(`strike${strikeNumber}Rider${riderNumber}DamageBonus`).value || 0,
        riderDamageType: document.getElementById(`strike${strikeNumber}Rider${riderNumber}DamageType`).value,
    }
    return riderDetails
}

function addRiderFields(strikeNum, riderNum) {  //(which Strike you're modifying, how many riders it has)
    let strikeDiv = document.getElementById(`strike${strikeNum}`)
    for (let i = 0; i < riderNum; i++) {
        let riderDiv = document.createElement('div')
        riderDiv.id = `rider${riderNum}`

        let riderTypeSelect = document.createElement('select')
        riderTypeSelect.id = `strike${strikeNum}Rider${riderNum}Type`

        let riderTypeOption1 = document.createElement('option')
        riderTypeOption1.value = 'extraDamage'
        riderTypeOption1.innerText = 'Extra Damage'

        let riderTypeOption2 = document.createElement('option')
        riderTypeOption2.value = 'effect'
        riderTypeOption2.innerText = 'Effect'

        let riderNameInput = document.createElement('input')
        riderNameInput.id = `strike${strikeNum}Rider${riderNum}Name`
        riderNameInput.placeholder = "rider effect name"

        let riderDiceNumberInput = document.createElement('input')
        riderDiceNumberInput.id = `strike${strikeNum}Rider${riderNum}DiceNumber`
        riderDiceNumberInput.placeholder = "number of dice"

        let riderDiceSizeInput = document.createElement('input')
        riderDiceSizeInput.id = `strike${strikeNum}Rider${riderNum}DiceSize`
        riderDiceSizeInput.placeholder = "size of dice"

        let riderDamageBonusInput = document.createElement('input')
        riderDamageBonusInput.id = `strike${strikeNum}Rider${riderNum}DamageBonus`
        riderDamageBonusInput.placeholder = "flat damage bonus"

        let riderDamageTypeInput = document.createElement('input')
        riderDamageTypeInput.id = `strike${strikeNum}Rider${riderNum}DamageType`
        riderDamageTypeInput.placeholder = 'damage type'

        riderDiv.appendChild(riderTypeSelect)
            riderTypeSelect.appendChild(riderTypeOption1)
            riderTypeSelect.appendChild(riderTypeOption2)
        riderDiv.appendChild(riderNameInput)
        riderDiv.appendChild(riderDiceNumberInput)
        riderDiv.appendChild(riderDiceSizeInput)
        riderDiv.appendChild(riderDamageBonusInput)
        riderDiv.appendChild(riderDamageTypeInput)
        strikeDiv.appendChild(riderDiv)
    }
    console.log(strikeNum,riderNum)
}

//consider assigning skill values as either the given skill bonus || the appropriate ability modifier bonus, since untrained skills still use the creature's base stats on skill checks