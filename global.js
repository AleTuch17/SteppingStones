

let augment = 1;
let steps = null;

export function updateAugment(aug){
augment = aug;
}


export function grabAugment(){
    return augment;
}

export function updateSteps(currentSteps){
    steps = currentSteps;
}

export function grabSteps(){
    let out = steps;
    steps = null;
    return out;
}
