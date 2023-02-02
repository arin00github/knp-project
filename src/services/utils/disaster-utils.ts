import {
    SITU_COLOR,
    SITU_COLOR_NATURAL_DISASTER,
    SITU_COLOR_SAFETY_ACCIDENT,
    SITU_COLOR_WILD_FIRE,
    SITU_LEVEL,
    SITU_NATURAL_DISASTER,
    SITU_SAFETY_ACCIDENT,
    SITU_WILD_FIRE,
} from "../interfaces";

export const getSituationColor = (situationLevel: SITU_LEVEL): SITU_COLOR => {
    let situationColor: SITU_COLOR = "";
    if (situationLevel === SITU_NATURAL_DISASTER) {
        situationColor = SITU_COLOR_NATURAL_DISASTER;
    }
    if (situationLevel === SITU_WILD_FIRE) {
        situationColor = SITU_COLOR_WILD_FIRE;
    }
    if (situationLevel === SITU_SAFETY_ACCIDENT) {
        situationColor = SITU_COLOR_SAFETY_ACCIDENT;
    }
    return situationColor;
};
