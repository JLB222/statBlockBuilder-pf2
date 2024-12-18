document.querySelector('#submitButton').addEventListener('click', createCreature)

function createCreature() {
    let creature = {
        name: document.querySelector('#name').value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(" "),
        id: +document.querySelector('#creatureId').value,
        source: document.querySelector('#source').value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(" "),
        level: +document.querySelector('#level').value,
        tags: document.querySelector('#tags').value.split(",").map(el => el[0]?.toUpperCase() + el.slice(1)),
        recallKnowledgeCategory: document.querySelector('#recallKnowledgeCategory').value,
        recallKnowledgeDC: document.querySelector('#recallKnowledgeDC').value.split(",").map(Number),  
        perception: +document.querySelector('#perception').value,
        vision: document.querySelector('#vision').value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(""),
        otherSenses: document.querySelector('#otherSenses').value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)),
        languages: document.querySelector('#languages').value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)),

        skillBonusAcrobatics: +document.querySelector('#acrobatics').value || 0,
        skillBonusArcana: +document.querySelector('#arcana').value || 0,
        skillBonusAthletics: +document.querySelector('#athletics').value || 0,
        skillBonusCrafting: +document.querySelector('#crafting').value || 0,
        skillBonusDeception: +document.querySelector('#deception').value || 0,
        skillBonusDiplomacy: +document.querySelector('#diplomacy').value || 0,
        skillBonusIntimidation: +document.querySelector('#intimidation').value || 0,
        skillBonusLore: createLoreObject(),
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
        defenseImmunities: document.querySelector('#Immunities').value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)) || [],
        defenseResistances: document.querySelector('#Resistances').value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)) || [],
        defenseWeaknesses: document.querySelector('#Weaknesses').value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)) || [],

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
        rituals: [],
        spells: [],
        spellsAtWill: [],
        spellsConstant: [],
        specialAbilities: [],
        items: document.getElementById('Items').value ? document.getElementById('Items').value.split(",").map(el => el[0]?.toUpperCase() + el.slice(1)) : "",
        notes: []
    }
    let numOfStrikes = document.getElementById('Strikes').value
    for (let i = 1; i <= numOfStrikes; i++) {
        creature.strikes.push(createStrike(i))
    }
    let numOfRituals = document.getElementById('rituals').value
    for (let i = 1; i <= numOfRituals; i++) {
        creature.rituals.push(createRitual(i))
    }
    let numOfSpells = document.getElementById('spells').value
    for (let i = 1; i <= numOfSpells; i++) {
        creature.spells.push(createSpell(i))
    }
    let numOfAtWillSpells = document.getElementById('atWillSpells').value
    for (let i = 1; i <= numOfAtWillSpells; i++) {
        creature.spellsAtWill.push(createAtWillSpell(i))
    }
    let numOfConstantSpells = document.getElementById('constantSpells').value
    for (let i = 1; i <= numOfConstantSpells; i++) {
        creature.spellsConstant.push(createConstantSpell(i))
    }
    let numOfNotes = document.getElementById('notes').value
    for (let i = 1; i <= numOfNotes; i++) {
        creature.notes.push(createNote(i))
    }
    let numOfSpecials = document.getElementById('specialAbilities').value
    for (let i = 1; i <= numOfSpecials; i++) {
        creature.specialAbilities.push(createSpecialAbility(i))
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
        weaponTraits: document.getElementById(`strike${strikeNum}WeaponTraits`).value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)),
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
        riderName: document.getElementById(`strike${strikeNumber}Rider${riderNumber}Name`).value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(""),
        type: document.getElementById(`strike${strikeNumber}Rider${riderNumber}Type`).value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(""),
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


//Rituals
document.getElementById('ritualButton').addEventListener('click', addRitualFields)
function addRitualFields() {
    let numOfFields = document.getElementById('rituals').value
    for (let i = 0; i < numOfFields; i++) {
        let ritualNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `ritual${ritualNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `ritual${ritualNumber}Name`
        newInputName.placeholder = `Name of the ritual?`
        newInputName.type = "text"

        let newInputRitualRank = document.createElement('input')
        newInputRitualRank.id = `ritual${ritualNumber}Rank`
        newInputRitualRank.placeholder = `What rank is this ritual?`
        newInputRitualRank.type = "number"
        
        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputRitualRank)

        document.getElementById('ritualFields').appendChild(newDiv)
    }
}
function createRitual(ritualNum) {
    let ritual = {
        name: document.getElementById(`ritual${ritualNum}Name`).value,
        rank: document.getElementById(`ritual${ritualNum}Rank`).value,
    }
    return ritual
}

//Limited Use Spells
document.getElementById('spellButton').addEventListener('click', addSpellFields)
function addSpellFields() {
    let numOfFields = document.getElementById('spells').value
    for (let i = 0; i < numOfFields; i++) {
        let spellNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `spell${spellNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `spell${spellNumber}Name`
        newInputName.placeholder = `Name of the spell?`
        newInputName.type = "text"

        let newInputSpellRank = document.createElement('input')
        newInputSpellRank.id = `spell${spellNumber}Rank`
        newInputSpellRank.placeholder = `What rank is this spell?`
        newInputSpellRank.type = "number"

        let newInputSpellTradition = document.createElement('input')
        newInputSpellTradition.id = `spell${spellNumber}Tradition`
        newInputSpellTradition.placeholder = `What tradition is this spell?`
        newInputSpellTradition.type = "text"

        let newInputSpellInnate = document.createElement('input')
        newInputSpellInnate.id = `spell${spellNumber}Innate`
        newInputSpellInnate.placeholder = `Innate? true or false`
        newInputSpellInnate.type = "text"

        let newInputSpellUses = document.createElement('input')
        newInputSpellUses.id = `spell${spellNumber}Uses`
        newInputSpellUses.placeholder = `How many uses?`
        newInputSpellUses.type = "number"
        
        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputSpellRank)
        newDiv.appendChild(newInputSpellTradition)
        newDiv.appendChild(newInputSpellInnate)
        newDiv.appendChild(newInputSpellUses)

        document.getElementById('spellFields').appendChild(newDiv)
    }
}
function createSpell(spellNum) {
    let spell = {
        name: document.getElementById(`spell${spellNum}Name`).value,
        rank: document.getElementById(`spell${spellNum}Rank`).value,
        tradition: document.getElementById(`spell${spellNum}Tradition`).value,
        innate: document.getElementById(`spell${spellNum}Innate`).value === 'true',
        uses: document.getElementById(`spell${spellNum}Uses`).value,
    }
    return spell
}

//Unlimited Use Spells
document.getElementById('atWillSpellButton').addEventListener('click', addAtWillSpellFields)
function addAtWillSpellFields() {
    let numOfFields = document.getElementById('atWillSpells').value
    for (let i = 0; i < numOfFields; i++) {
        let spellNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `atWillSpell${spellNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `atWillSpell${spellNumber}Name`
        newInputName.placeholder = `Name of the spell?`
        newInputName.type = "text"

        let newInputSpellRank = document.createElement('input')
        newInputSpellRank.id = `atWillSpell${spellNumber}Rank`
        newInputSpellRank.placeholder = `What rank is this spell?`
        newInputSpellRank.type = "number"

        let newInputSpellTradition = document.createElement('input')
        newInputSpellTradition.id = `atWillSpell${spellNumber}Tradition`
        newInputSpellTradition.placeholder = `What tradition is this spell?`
        newInputSpellTradition.type = "text"

        let newInputSpellInnate = document.createElement('input')
        newInputSpellInnate.id = `atWillSpell${spellNumber}Innate`
        newInputSpellInnate.placeholder = `Innate? true or false`
        newInputSpellInnate.type = "text"
        
        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputSpellRank)
        newDiv.appendChild(newInputSpellTradition)
        newDiv.appendChild(newInputSpellInnate)

        document.getElementById('atWillSpellFields').appendChild(newDiv)
    }
}
function createAtWillSpell(spellNum) {
    let atWillSpell = {
        name: document.getElementById(`spell${spellNum}Name`).value,
        rank: document.getElementById(`spell${spellNum}Rank`).value,
        tradition: document.getElementById(`spell${spellNum}Tradition`).value,
        innate: document.getElementById(`spell${spellNum}Innate`).value === 'true',
    }
    return atWillSpell
}

//Constant spells 
document.getElementById('constantSpellButton').addEventListener('click', addConstantSpellFields)
function addConstantSpellFields() {
    let numOfFields = document.getElementById('constantSpells').value
    for (let i = 0; i < numOfFields; i++) {
        let spellNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `constantSpell${spellNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `constantSpell${spellNumber}Name`
        newInputName.placeholder = `Name of the spell?`
        newInputName.type = "text"

        let newInputSpellRank = document.createElement('input')
        newInputSpellRank.id = `constantSpell${spellNumber}Rank`
        newInputSpellRank.placeholder = `What rank is this spell?`
        newInputSpellRank.type = "number"

        let newInputSpellTradition = document.createElement('input')
        newInputSpellTradition.id = `constantSpell${spellNumber}Tradition`
        newInputSpellTradition.placeholder = `What tradition is this spell?`
        newInputSpellTradition.type = "text"

        let newInputSpellInnate = document.createElement('input')
        newInputSpellInnate.id = `constantSpell${spellNumber}Innate`
        newInputSpellInnate.placeholder = `Innate? true or false`
        newInputSpellInnate.type = "text"
        
        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputSpellRank)
        newDiv.appendChild(newInputSpellTradition)
        newDiv.appendChild(newInputSpellInnate)

        document.getElementById('constantSpellFields').appendChild(newDiv)
    }
}
function createConstantSpell(spellNum) {
    let constantSpell = {
        name: document.getElementById(`constantSpell${spellNum}Name`).value,
        rank: document.getElementById(`constantSpell${spellNum}Rank`).value,
        tradition: document.getElementById(`constantSpell${spellNum}Tradition`).value,
        innate: document.getElementById(`constantSpell${spellNum}Innate`).value === 'true',
    }
    return constantSpell
}

//Notes, such as shield stats
document.getElementById('noteButton').addEventListener('click', addNoteFields)
function addNoteFields() {
    let numOfFields = document.getElementById('notes').value
    for (let i = 0; i < numOfFields; i++) {
        let noteNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `note${noteNumber}`

        let newInputEntry = document.createElement('input')
        newInputEntry.id = `note${noteNumber}Entry`
        newInputEntry.placeholder = `"Shield" or an actual note about creature`
        newInputEntry.type = "text"

        let newInputShieldHardness = document.createElement('input')
        newInputShieldHardness.id = `note${noteNumber}ShieldHardness`
        newInputShieldHardness.placeholder = `What is the shield's hardness?`
        newInputShieldHardness.type = "number"

        let newInputShieldHP = document.createElement('input')
        newInputShieldHP.id = `note${noteNumber}ShieldHP`
        newInputShieldHP.placeholder = `What is the shield's max HP?`
        newInputShieldHP.type = "number"

        let newInputShieldBrokenThreshold = document.createElement('input')
        newInputShieldBrokenThreshold.id = `note${noteNumber}ShieldBrokenThreshold`
        newInputShieldBrokenThreshold.placeholder = `what is the broken threshold?`
        newInputShieldBrokenThreshold.type = "number"
        
        newDiv.appendChild(newInputEntry)
        newDiv.appendChild(newInputShieldHardness)
        newDiv.appendChild(newInputShieldHP)
        newDiv.appendChild(newInputShieldBrokenThreshold)

        document.getElementById('noteFields').appendChild(newDiv)
    }
}
function createNote(noteNum) {
    let entryString = document.getElementById(`note${noteNum}Entry`).value
    let note = {
        entry: entryString[0].toUpperCase() + entryString.slice(1),
        shieldHardness: +document.getElementById(`note${noteNum}ShieldHardness`).value,
        shieldHP: +document.getElementById(`note${noteNum}ShieldHP`).value,
        shieldBrokenThreshold: +document.getElementById(`note${noteNum}ShieldBrokenThreshold`).value,
    }
    return note
}

//Special Abilities
document.getElementById('specialAbilityButton').addEventListener('click', addSpecialAbilityFields)
function addSpecialAbilityFields() {
    let numOfFields = document.getElementById('specialAbilities').value
    for (let i = 0; i < numOfFields; i++) {
        let specialAbilityNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `specialAbility${specialAbilityNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `specialAbility${specialAbilityNumber}Name`
        newInputName.placeholder = `name of the special`
        newInputName.type = "text"

        let newInputType = document.createElement('input')
        newInputType.id = `specialAbility${specialAbilityNumber}Type`
        newInputType.placeholder = `type of special`
        newInputType.type = "text"

        let newInputNumberOfActions = document.createElement('input')
        newInputNumberOfActions.id = `specialAbility${specialAbilityNumber}NumOfActions`
        newInputNumberOfActions.placeholder = `number of actions`
        newInputNumberOfActions.type = "number"

        let newInputTraits = document.createElement('input')
        newInputTraits.id = `specialAbility${specialAbilityNumber}Traits`
        newInputTraits.placeholder = `what are the traits?`
        newInputTraits.type = "text"

        let newInputDescription = document.createElement('input')
        newInputDescription.id = `specialAbility${specialAbilityNumber}Description`
        newInputDescription.placeholder = `description`
        newInputDescription.type = "text"

        let newInputDiceNumber = document.createElement('input')
        newInputDiceNumber.id = `specialAbility${specialAbilityNumber}DiceNumber`
        newInputDiceNumber.placeholder = `how many damage dice?`
        newInputDiceNumber.type = "number"

        let newInputDiceSize = document.createElement('input')
        newInputDiceSize.id = `specialAbility${specialAbilityNumber}DiceSize`
        newInputDiceSize.placeholder = `dice size?`
        newInputDiceSize.type = "number"

        let newInputDamageBonus = document.createElement('input')
        newInputDamageBonus.id = `specialAbility${specialAbilityNumber}DamageBonus`
        newInputDamageBonus.placeholder = `damage bonus`
        newInputDamageBonus.type = "number"

        let newInputDamageType = document.createElement('input')
        newInputDamageType.id = `specialAbility${specialAbilityNumber}DamageType`
        newInputDamageType.placeholder = `what type of dmg?`
        newInputDamageType.type = "text"

        let newInputTrigger = document.createElement('input')
        newInputTrigger.id = `specialAbility${specialAbilityNumber}Trigger`
        newInputTrigger.placeholder = `reaction trigger is?`
        newInputTrigger.type = "text"

        let newInputEffect = document.createElement('input')
        newInputEffect.id = `specialAbility${specialAbilityNumber}Effect`
        newInputEffect.placeholder = `what effect does it have?`
        newInputEffect.type = "text"
        
        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputType)
        newDiv.appendChild(newInputNumberOfActions)
        newDiv.appendChild(newInputTraits)
        newDiv.appendChild(newInputDescription)
        newDiv.appendChild(newInputDiceNumber)
        newDiv.appendChild(newInputDiceSize)
        newDiv.appendChild(newInputDamageBonus)
        newDiv.appendChild(newInputDamageType)
        newDiv.appendChild(newInputTrigger)
        newDiv.appendChild(newInputEffect)

        document.getElementById('specialAbilityFields').appendChild(newDiv)
    }
}
function createSpecialAbility(specialAbilityNum) {
    let special = {
        name: document.getElementById(`specialAbility${specialAbilityNum}Name`).value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(" "),
        type: document.getElementById(`specialAbility${specialAbilityNum}Type`).value.split(" ").map(el => el[0]?.toUpperCase() + el.slice(1)).join(" "),
        numberOfActions: +document.getElementById(`specialAbility${specialAbilityNum}NumOfActions`).value,
        traits: document.getElementById(`specialAbility${specialAbilityNum}Traits`).value.split(",").filter(el => el.trim() !== "").map(el => el[0]?.toUpperCase() + el.slice(1)),
        diceNumber: +document.getElementById(`specialAbility${specialAbilityNum}DiceNumber`).value,
        diceSize: +document.getElementById(`specialAbility${specialAbilityNum}DiceSize`).value,
        damageBonus: +document.getElementById(`specialAbility${specialAbilityNum}DamageBonus`).value,
        damageType: document.getElementById(`specialAbility${specialAbilityNum}DamageType`).value,
        trigger: document.getElementById(`specialAbility${specialAbilityNum}Trigger`).value,
        effect: document.getElementById(`specialAbility${specialAbilityNum}Effect`).value,
        description: document.getElementById(`specialAbility${specialAbilityNum}Description`).value,
    }
    return special
}

//Lore Skill
document.getElementById('loreButton').addEventListener('click', addLoreFields)
function addLoreFields() {
    let numOfFields = document.getElementById('loreSkills').value
    for (let i = 0; i < numOfFields; i++) {
        let loreSkillNumber = i+1
        let newDiv = document.createElement('div')
        newDiv.id = `lore${loreSkillNumber}`

        let newInputName = document.createElement('input')
        newInputName.id = `loreSkill${loreSkillNumber}Name`
        newInputName.placeholder = `Lore Name`
        newInputName.type = "text"

        let newInputValue = document.createElement('input')
        newInputValue.id = `loreSkill${loreSkillNumber}Value`
        newInputValue.placeholder = `lore bonus`
        newInputValue.type = "number"

        newDiv.appendChild(newInputName)
        newDiv.appendChild(newInputValue)

        document.getElementById('loreFields').appendChild(newDiv)
    }
}

function createLoreObject() {
    let numberOfLores = document.getElementById(`loreSkills`).value
    let lore = {}
    for (let i = 1; i <= numberOfLores; i++) {
        loreName =  document.getElementById(`loreSkill${i}Name`).value
        loreBonus = document.getElementById(`loreSkill${i}Value`).value
        lore[loreName] = +loreBonus
    }
    return lore
}


//stat block cleaner - removes all properties whose value is an empty string or empty array
function trimEmptyValues(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
  
    return Object.entries(obj).reduce((result, [key, value]) => {
      // Recursively process nested objects
      if (typeof value === 'object' && !Array.isArray(value)) {
        value = trimEmptyValues(value);
      }
      // Only add to result if value is not an empty string/array and not null
      if (
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        value !== null
      ) {
        result[key] = value;
      }
      return result;
    }, {});
}