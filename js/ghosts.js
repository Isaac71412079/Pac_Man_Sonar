let GHOST_BLINKY_CANVAS_CONTEXT = null;
var GHOST_BLINKY_POSITION_X = 276;
var GHOST_BLINKY_POSITION_Y = 204;
var GHOST_BLINKY_DIRECTION = 1;
var GHOST_BLINKY_COLOR = "#ed1b24";
var GHOST_BLINKY_MOVING_TIMER = -1;
var GHOST_BLINKY_MOVING = false;
var GHOST_BLINKY_BODY_STATE = 0;
var GHOST_BLINKY_STATE = 0;
var GHOST_BLINKY_EAT_TIMER = null;
var GHOST_BLINKY_AFFRAID_TIMER = null;
var GHOST_BLINKY_AFFRAID_STATE = 0;
var GHOST_BLINKY_TUNNEL = false;

let GHOST_PINKY_CANVAS_CONTEXT = null;
var GHOST_PINKY_POSITION_X = 276;
var GHOST_PINKY_POSITION_Y = 258;
var GHOST_PINKY_DIRECTION = 2;
var GHOST_PINKY_COLOR = "#feaec9";
var GHOST_PINKY_MOVING_TIMER = -1;
var GHOST_PINKY_MOVING = false;
var GHOST_PINKY_BODY_STATE = 1;
var GHOST_PINKY_STATE = 0;
var GHOST_PINKY_EAT_TIMER = null;
var GHOST_PINKY_AFFRAID_TIMER = null;
var GHOST_PINKY_AFFRAID_STATE = 0;
var GHOST_PINKY_TUNNEL = false;

let GHOST_INKY_CANVAS_CONTEXT = null;
var GHOST_INKY_POSITION_X = 238;
var GHOST_INKY_POSITION_Y = 258;
var GHOST_INKY_DIRECTION = 3;
var GHOST_INKY_COLOR = "#4adecb";
var GHOST_INKY_MOVING_TIMER = -1;
var GHOST_INKY_MOVING = false;
var GHOST_INKY_BODY_STATE = 2;
var GHOST_INKY_STATE = 0;
var GHOST_INKY_EAT_TIMER = null;
var GHOST_INKY_AFFRAID_TIMER = null;
var GHOST_INKY_AFFRAID_STATE = 0;
var GHOST_INKY_TUNNEL = false;

let GHOST_CLYDE_CANVAS_CONTEXT = null;
var GHOST_CLYDE_POSITION_X = 314;
var GHOST_CLYDE_POSITION_Y = 258;
var GHOST_CLYDE_DIRECTION = 4;
var GHOST_CLYDE_COLOR = "#f99c00";
var GHOST_CLYDE_MOVING_TIMER = -1;
var GHOST_CLYDE_MOVING = false;
var GHOST_CLYDE_BODY_STATE = 3;
var GHOST_CLYDE_STATE = 0;
var GHOST_CLYDE_EAT_TIMER = null;
var GHOST_CLYDE_AFFRAID_TIMER = null;
var GHOST_CLYDE_AFFRAID_STATE = 0;
var GHOST_CLYDE_TUNNEL = false;

var GHOST_AFFRAID_COLOR = "#2d3eff";
var GHOST_AFFRAID_FINISH_COLOR = "#fff";
var GHOST_POSITION_STEP = 2;
var GHOST_MOVING_SPEED = 15;
var GHOST_TUNNEL_MOVING_SPEED = 35;
var GHOST_AFFRAID_MOVING_SPEED = 40;
var GHOST_EAT_MOVING_SPEED = 6;
var GHOST_AFFRAID_TIME = 8500;
var GHOST_EAT_TIME = 5500;
var GHOST_BODY_STATE_MAX = 6;

function initGhosts() { 
	initGhost('blinky');
	initGhost('pinky');
	initGhost('inky');
	initGhost('clyde');
}

let ghostCanvasContexts = {
    blinky: null,
    pinky: null,
    inky: null,
    clyde: null
};

function initGhost(ghost) { 
    let canvas = document.getElementById('canvas-ghost-' + ghost);
    canvas.setAttribute('width', '550');
    canvas.setAttribute('height', '550');
    if (canvas.getContext) { 
        ghostCanvasContexts[ghost.toLowerCase()] = canvas.getContext("2d");
    }
}

function resetGhosts() { 
	stopGhosts();

	GHOST_BLINKY_POSITION_X = 276;
	GHOST_BLINKY_POSITION_Y = 204;
	GHOST_BLINKY_DIRECTION = 1;
	GHOST_BLINKY_MOVING_TIMER = -1;
	GHOST_BLINKY_MOVING = false;
	GHOST_BLINKY_BODY_STATE = 0;
	GHOST_BLINKY_STATE = 0;
	GHOST_BLINKY_EAT_TIMER = null;
	GHOST_BLINKY_AFFRAID_TIMER = null;
	GHOST_BLINKY_AFFRAID_STATE = 0;

	GHOST_PINKY_POSITION_X = 276;
	GHOST_PINKY_POSITION_Y = 258;
	GHOST_PINKY_DIRECTION = 2;
	GHOST_PINKY_MOVING_TIMER = -1;
	GHOST_PINKY_MOVING = false;
	GHOST_PINKY_BODY_STATE = 1;
	GHOST_PINKY_STATE = 0;
	GHOST_PINKY_EAT_TIMER = null;
	GHOST_PINKY_AFFRAID_TIMER = null;
	GHOST_PINKY_AFFRAID_STATE = 0;

	GHOST_INKY_POSITION_X = 238;
	GHOST_INKY_POSITION_Y = 258;
	GHOST_INKY_DIRECTION = 3;
	GHOST_INKY_MOVING_TIMER = -1;
	GHOST_INKY_MOVING = false;
	GHOST_INKY_BODY_STATE = 2;
	GHOST_INKY_STATE = 0;
	GHOST_INKY_EAT_TIMER = null;
	GHOST_INKY_AFFRAID_TIMER = null;
	GHOST_INKY_AFFRAID_STATE = 0;

	GHOST_CLYDE_POSITION_X = 314;
	GHOST_CLYDE_POSITION_Y = 258;
	GHOST_CLYDE_DIRECTION = 4;
	GHOST_CLYDE_MOVING_TIMER = -1;
	GHOST_CLYDE_MOVING = false;
	GHOST_CLYDE_BODY_STATE = 3;
	GHOST_CLYDE_STATE = 0;
	GHOST_CLYDE_EAT_TIMER = null;
	GHOST_CLYDE_AFFRAID_TIMER = null;
	GHOST_CLYDE_AFFRAID_STATE = 0;
}

function getGhostCanevasContext(ghost) {
    return ghostCanvasContexts[ghost.toLowerCase()];
}

function drawGhosts() { 
	drawGhost("blinky");
	drawGhost('pinky');
	drawGhost('inky');
	drawGhost("clyde");
}

function drawGhost(ghost) { 

	let ctx = getGhostCanevasContext(ghost);

	let ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    let ghostColor = window['GHOST_' + ghost.toUpperCase() + '_COLOR'];
    let ghostAffraidState = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'];

	if (ghostState === 0) {
        ctx.fillStyle = ghostColor;
    } else {
        ctx.fillStyle = (ghostAffraidState === 1) ? GHOST_AFFRAID_FINISH_COLOR : GHOST_AFFRAID_COLOR;
    }

	let positionX = window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'];
    let positionY = window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'];
    let direction = window['GHOST_' + ghost.toUpperCase() + '_DIRECTION'];
    let bodyState = window['GHOST_' + ghost.toUpperCase() + '_BODY_STATE'];

	drawHelperGhost(ctx, positionX, positionY, direction, bodyState, ghostState, ghostAffraidState);

	ctx.closePath();
	
	
}

function affraidGhosts() { 
	
	playWazaSound();
	
	SCORE_GHOST_COMBO = 200;

	affraidGhost("blinky");
	affraidGhost("pinky");
	affraidGhost("inky");
	affraidGhost("clyde");
}

function affraidGhost(ghost) { 
    let affraidTimer = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'];
    
    if (affraidTimer !== null) { 
        affraidTimer.cancel();
        window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'] = null;
    }
    window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'] = 0;

    let ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    if (ghostState === 0 || ghostState === 1) {
        stopGhost(ghost);
        window['GHOST_' + ghost.toUpperCase() + '_STATE'] = 1;
        moveGhost(ghost);
        window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'] = new Timer("cancelAffraidGhost('" + ghost + "')", GHOST_AFFRAID_TIME);
    }
}

function cancelAffraidGhost(ghost) { 
    let ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    let affraidTimer = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'];
    
    if (ghostState === 1) { 
        if (affraidTimer !== null) {
            affraidTimer.cancel();
        }
        window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'] = null;
        stopGhost(ghost);
        window['GHOST_' + ghost.toUpperCase() + '_STATE'] = 0;
        moveGhost(ghost);
        testStateGhosts();
    }
}


function testStateGhosts() { 

	if ( GHOST_BLINKY_STATE === 1 ||  
		 GHOST_PINKY_STATE === 1 ||  
		 GHOST_INKY_STATE === 1 ||  
		 GHOST_CLYDE_STATE === 1 
	) { 
		playWazaSound();
	} else if ( GHOST_BLINKY_STATE === -1 ||  
		 GHOST_PINKY_STATE === -1 ||  
		 GHOST_INKY_STATE === -1 ||  
		 GHOST_CLYDE_STATE === -1 
	) { 
		playGhostEatenSound();		
	} else { 
		playSirenSound();
	}
}

function startEatGhost(ghost) {
    if (!LOCK) {
        playEatGhostSound();

        LOCK = true;

        const ghostUpper = ghost.toUpperCase();
        const affraidTimer = window[`GHOST_${ghostUpper}_AFFRAID_TIMER`];

        if (affraidTimer !== null) {
            affraidTimer.cancel();
            window[`GHOST_${ghostUpper}_AFFRAID_TIMER`] = null;
        }

        score(SCORE_GHOST_COMBO, ghost);

        pauseGhosts();
        pausePacman();

        setTimeout(() => eatGhost(ghost), 600);
    }
}

function eatGhost(ghost) {
    playGhostEatenSound();

    const ghostUpper = ghost.toUpperCase();
    if (window[`GHOST_${ghostUpper}_STATE`] === 1) {
        $("#board span.combo").remove();
        window[`GHOST_${ghostUpper}_STATE`] = -1;
        window[`GHOST_${ghostUpper}_EAT_TIMER`] = new Timer(() => cancelEatGhost(ghost), GHOST_EAT_TIME);
        window[`GHOST_${ghostUpper}_EAT_TIMER`].pause();
    }
    resumeGhosts();
    resumePacman();
    LOCK = false;
}

function cancelEatGhost(ghost) {
    const ghostUpper = ghost.toUpperCase();
    if (window[`GHOST_${ghostUpper}_STATE`] === -1) {
        window[`GHOST_${ghostUpper}_EAT_TIMER`] = null;
        stopGhost(ghost);
        window[`GHOST_${ghostUpper}_STATE`] = 0;
        moveGhost(ghost);
        testStateGhosts();
    }
}

function moveGhosts() { 
	moveGhost("blinky");
	moveGhost('pinky');
	moveGhost('inky');
	moveGhost("clyde");
}
/////////////
function moveGhost(ghost) {
    const ghostUpper = ghost.toUpperCase();
    if (!window[`GHOST_${ghostUpper}_MOVING`]) {
        startGhostMovement(ghostUpper);
    } else {
        processGhostMovement(ghostUpper);
    }
}

function startGhostMovement(ghostUpper) {
    window[`GHOST_${ghostUpper}_MOVING`] = true;
    const speed = getGhostSpeed(ghostUpper);
    window[`GHOST_${ghostUpper}_MOVING_TIMER`] = setInterval(() => moveGhost(ghostUpper), speed);
}

function getGhostSpeed(ghostUpper) {
    if (window[`GHOST_${ghostUpper}_STATE`] === 1) {
        return GHOST_AFFRAID_MOVING_SPEED;
    }
    return window[`GHOST_${ghostUpper}_TUNNEL`] ? GHOST_TUNNEL_MOVING_SPEED : GHOST_MOVING_SPEED;
}

function processGhostMovement(ghostUpper) {
    changeDirection(ghostUpper);
    handleGhostAfraidState(ghostUpper);
    if (canMoveGhost(ghostUpper)) {
        updateGhostPosition(ghostUpper);
        drawGhost(ghostUpper);
        testGhostInteractions(ghostUpper);
    } else {
        window[`GHOST_${ghostUpper}_DIRECTION`] = oneDirection();
    }
}

function handleGhostAfraidState(ghostUpper) {
    const afraidTimer = window[`GHOST_${ghostUpper}_AFFRAID_TIMER`];
    if (afraidTimer) {
        const remainingTime = afraidTimer.remain();
        window[`GHOST_${ghostUpper}_AFFRAID_STATE`] = (remainingTime < 0 || (remainingTime >= 500 && remainingTime <= 1000)) ? 1 : 0;
    }
}

function updateGhostPosition(ghostUpper) {
    eraseGhost(ghostUpper);
    const currentDirection = window[`GHOST_${ghostUpper}_DIRECTION`];
    const positionStep = GHOST_POSITION_STEP;

    switch (currentDirection) {
        case 1: window[`GHOST_${ghostUpper}_POSITION_X`] += positionStep; break;
        case 2: window[`GHOST_${ghostUpper}_POSITION_Y`] += positionStep; break;
        case 3: window[`GHOST_${ghostUpper}_POSITION_X`] -= positionStep; break;
        case 4: window[`GHOST_${ghostUpper}_POSITION_Y`] -= positionStep; break;
    }
    handleGhostPositionLoop(ghostUpper);
    updateGhostBodyState(ghostUpper);
}

function handleGhostPositionLoop(ghostUpper) {
    const posX = window[`GHOST_${ghostUpper}_POSITION_X`];
    const posY = window[`GHOST_${ghostUpper}_POSITION_Y`];

    if (posX === 2 && posY === 258) {
        window[`GHOST_${ghostUpper}_POSITION_X`] = 548;
    } else if (posX === 548 && posY === 258) {
        window[`GHOST_${ghostUpper}_POSITION_X`] = 2;
    }
}

function updateGhostBodyState(ghostUpper) {
    const currentBodyState = window[`GHOST_${ghostUpper}_BODY_STATE`];
    window[`GHOST_${ghostUpper}_BODY_STATE`] = currentBodyState < GHOST_BODY_STATE_MAX ? currentBodyState + 1 : 0;
}

function testGhostInteractions(ghostUpper) {
    if (window[`GHOST_${ghostUpper}_BODY_STATE`] === 3 && window[`GHOST_${ghostUpper}_STATE`] !== -1) {
        if (!PACMAN_MOVING) {
            testGhostPacman(ghostUpper);
        }
        testGhostTunnel(ghostUpper);
    }
}


/////////////////
function testGhostTunnel(ghost) {
    if (window['GHOST_' + ghost.toUpperCase() + '_STATE'] === 0) {
        if (isInTunnel(ghost) && !window['GHOST_' + ghost.toUpperCase() + '_TUNNEL']) {
            stopGhost(ghost);
            window['GHOST_' + ghost.toUpperCase() + '_TUNNEL'] = true;
            moveGhost(ghost);
        } else if (!isInTunnel(ghost) && window['GHOST_' + ghost.toUpperCase() + '_TUNNEL']) {
            stopGhost(ghost);
            window['GHOST_' + ghost.toUpperCase() + '_TUNNEL'] = false;
            moveGhost(ghost);
        }
    }
}

function isInTunnel(ghost) {
    return (
        (window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] >= 2 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] <= 106 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] === 258) ||
        (window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] >= 462 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] <= 548 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] === 258)
    );
}
//////////
function changeDirection(ghost) {
    const ghostUpper = ghost.toUpperCase();
    const { direction, state, positionX, positionY } = getGhostProperties(ghostUpper);
    let tryDirection = oneDirection();

    if (state === 0 || state === 1) {
        tryDirection = calculateGhostDirection(ghost, positionX, positionY);
    } else {
        tryDirection = getRightDirectionForHome(oneAxe(), positionX, positionY);
    }

    if (canMoveGhost(ghost, tryDirection) && !isOppositeDirection(direction, tryDirection)) {
        window[`GHOST_${ghostUpper}_DIRECTION`] = tryDirection;
    }
}

function getGhostProperties(ghostUpper) {
    return {
        direction: window[`GHOST_${ghostUpper}_DIRECTION`],
        state: window[`GHOST_${ghostUpper}_STATE`],
        positionX: window[`GHOST_${ghostUpper}_POSITION_X`],
        positionY: window[`GHOST_${ghostUpper}_POSITION_Y`]
    };
}

function calculateGhostDirection(ghost, posX, posY) {
    if (posX !== 276 && posY !== 258) {
        const pacmanX = PACMAN_POSITION_X;
        const pacmanY = PACMAN_POSITION_Y;
        let axe = oneAxe();
        return calculateTargetDirection(ghost, axe, posX, posY, pacmanX, pacmanY);
    }
    return reverseDirection(oneDirection());
}

function calculateTargetDirection(ghost, axe, ghostX, ghostY, pacmanX, pacmanY) {
    let tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
    if (!canMoveGhost(ghost, tryDirection) || isOppositeDirection(window[`GHOST_${ghost.toUpperCase()}_DIRECTION`], tryDirection)) {
        axe = (axe % 2) + 1;
        tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
    }
    return tryDirection;
}

function isOppositeDirection(direction, tryDirection) {
    return Math.abs(direction - tryDirection) === 2;
}


////////////////

function getRightDirectionForHome(axe, ghostX, ghostY) { 
	let homeX = 276;
	let homeY = 204;
	
if (ghostY === 204 && ghostX === 276) { 	
    return 2;
} else if (ghostX === 276 && ghostY === 258) { 
    return oneDirectionX();
} else if (axe === 1) { 
    return (ghostX > homeX) ? 3 : 1;
} else { 
    return (ghostY > homeY) ? 4 : 2;
}

}
function getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY) { 
	if (axe === 1) { 
		if (ghostX > pacmanX) { 
		 return 3;
		} else { 
			return 1;
		}
	} else { 
		if (ghostY > pacmanY) { 
		 return 4;
		} else { 
			return 2;
		}
	}
}
function reverseDirection(direction) { 
	if (direction > 2) return direction - 2;
	else return direction + 2;
}

function eraseGhost(ghost) {
    let ctx = getGhostCanevasContext(ghost);
    let positionX = window[`GHOST_${ghost.toUpperCase()}_POSITION_X`];
    let positionY = window[`GHOST_${ghost.toUpperCase()}_POSITION_Y`];
    ctx.clearRect(positionX - 17, positionY - 17, 34, 34);
}

function eraseGhosts() { 

	eraseGhost('blinky');
	eraseGhost('pinky');
	eraseGhost('inky');
	eraseGhost('clyde');
}

function canMoveGhost(ghost, direction) {
    if (!direction) {
        direction = window[`GHOST_${ghost.toUpperCase()}_DIRECTION`];
    }
    let positionX = window[`GHOST_${ghost.toUpperCase()}_POSITION_X`];
    let positionY = window[`GHOST_${ghost.toUpperCase()}_POSITION_Y`];
    let state = window[`GHOST_${ghost.toUpperCase()}_STATE`];

    if (positionX === 276 && positionY === 204 && direction === 2 && state === 0) return false;

    switch (direction) {
        case 1: positionX += GHOST_POSITION_STEP; break;
        case 2: positionY += GHOST_POSITION_STEP; break;
        case 3: positionX -= GHOST_POSITION_STEP; break;
        case 4: positionY -= GHOST_POSITION_STEP; break;
    }

    for (let i = 0, imax = PATHS.length; i < imax; i++) {
        let p = PATHS[i].split("-");
        let [startX, startY] = p[0].split(",");
        let [endX, endY] = p[1].split(",");

        if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) {
            return true;
        }
    }
    return false;
}

function oneDirection() {
    return Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * 4) + 1;
}

function oneDirectionX() { 
	let direction = oneDirection();
	if (direction === 4 || direction === 2) direction -= 1;
	return direction;
}
function oneDirectionY() { 
	let direction = oneDirection();
	if (direction === 3 || direction === 1) direction -= 1;
	return direction;
}

function stopGhost(ghost) {
    let ghostUpper = ghost.toUpperCase();
    let state = window[`GHOST_${ghostUpper}_STATE`];

    if (state === 1) {
        let afraidTimer = window[`GHOST_${ghostUpper}_AFFRAID_TIMER`];
        if (afraidTimer !== null) afraidTimer.cancel();
        window[`GHOST_${ghostUpper}_AFFRAID_TIMER`] = null;
        window[`GHOST_${ghostUpper}_STATE`] = 0;
    } else if (state === -1) {
        let eatTimer = window[`GHOST_${ghostUpper}_EAT_TIMER`];
        if (eatTimer !== null) eatTimer.cancel();
        window[`GHOST_${ghostUpper}_EAT_TIMER`] = null;
        window[`GHOST_${ghostUpper}_STATE`] = 0;
    }

    let movingTimer = window[`GHOST_${ghostUpper}_MOVING_TIMER`];
    if (movingTimer != -1) {
        clearInterval(movingTimer);
        window[`GHOST_${ghostUpper}_MOVING_TIMER`] = -1;
        window[`GHOST_${ghostUpper}_MOVING`] = false;
    }
}

function stopGhosts() { 
	stopGhost('blinky');
	stopGhost('pinky');
	stopGhost('inky');
	stopGhost('clyde');
}

function pauseGhost(ghost) {
    let ghostUpper = ghost.toUpperCase();
    let state = window[`GHOST_${ghostUpper}_STATE`];

    if (state === 1) {
        let afraidTimer = window[`GHOST_${ghostUpper}_AFFRAID_TIMER`];
        if (afraidTimer !== null) afraidTimer.pause();
    } else if (state === -1) {
        let eatTimer = window[`GHOST_${ghostUpper}_EAT_TIMER`];
        if (eatTimer !== null) eatTimer.pause();
    }

    let movingTimer = window[`GHOST_${ghostUpper}_MOVING_TIMER`];
    if (movingTimer != -1) {
        clearInterval(movingTimer);
        window[`GHOST_${ghostUpper}_MOVING_TIMER`] = -1;
        window[`GHOST_${ghostUpper}_MOVING`] = false;
    }
}

function pauseGhosts() { 
	pauseGhost('blinky');
	pauseGhost('pinky');
	pauseGhost('inky');
	pauseGhost('clyde');
}

function resumeGhost(ghost) {
    let ghostUpper = ghost.toUpperCase();
    let state = window[`GHOST_${ghostUpper}_STATE`];

    if (state === 1) {
        let afraidTimer = window[`GHOST_${ghostUpper}_AFFRAID_TIMER`];
        if (afraidTimer !== null) afraidTimer.resume();
    } else if (state === -1) {
        let eatTimer = window[`GHOST_${ghostUpper}_EAT_TIMER`];
        if (eatTimer !== null) eatTimer.resume();
    }

    moveGhost(ghost);
}

function resumeGhosts() { 
	resumeGhost('blinky');
	resumeGhost('pinky');
	resumeGhost('inky');
	resumeGhost('clyde');
}


function drawHelperGhost(ctx, x, y, d, b, s, a) { 
    if (s != -1) { 
        drawGhostBody(ctx, x, y, b);
    }
    let { eyesX, eyesY } = getEyeOffsets(d);
    
    if (s === 0 || s === -1) {
        drawGhostEyes(ctx, x, y, eyesX, eyesY);
    } else {
        drawGhostAfraid(ctx, x, y, a);
    }
}

function drawGhostBody(ctx, x, y, b) {
    ctx.beginPath();
    ctx.moveTo((x - 15), (y + 16));
    ctx.lineTo((x - 15), (y + 16) - 18);
    ctx.bezierCurveTo((x - 15), (y + 16) - 26, (x - 15) + 6, (y + 16) - 32, (x - 15) + 14, (y + 16) - 32);
    ctx.bezierCurveTo((x - 15) + 22, (y + 16) - 32, (x - 15) + 28, (y + 16) - 26, (x - 15) + 28, (y + 16) - 18);
    ctx.lineTo((x - 15) + 28, (y + 16));

    if (b < 4) {
        drawGhostFeet(ctx, x, y, true);
    } else {
        drawGhostFeet(ctx, x, y, false);
    }

    ctx.lineTo((x - 15), (y + 16));
    ctx.fill();
}

function drawGhostFeet(ctx, x, y, smallFeet) {
    if (smallFeet) {
        ctx.lineTo((x - 15) + 23.333, (y + 16) - 5.333);
        ctx.lineTo((x - 15) + 18.666, (y + 16));
        ctx.lineTo((x - 15) + 14, (y + 16) - 5.333);
        ctx.lineTo((x - 15) + 9.333, (y + 16));
        ctx.lineTo((x - 15) + 4.666, (y + 16) - 5.333);
    } else {
        ctx.lineTo((x - 15) + 24.333, (y + 16) - 5.333);
        ctx.lineTo((x - 15) + 20.666, (y + 16));
        ctx.lineTo((x - 15) + 17.333, (y + 16) - 5.333);
        ctx.lineTo((x - 15) + 12.666, (y + 16));
        ctx.lineTo((x - 15) + 9, (y + 16) - 5.333);
        ctx.lineTo((x - 15) + 5.333, (y + 16));
        ctx.lineTo((x - 15) + 2.666, (y + 16) - 5.333);
    }
}

function getEyeOffsets(d) {
    let eyesX = 0, eyesY = 0;

    switch (d) {
        case 1:
            eyesX = 2;
            break;
        case 2:
            eyesY = 5;
            break;
        case 3:
            eyesX = -3;
            break;
        case 4:
            eyesY = -5;
            break;
    }

    return { eyesX, eyesY };
}

function drawGhostEyes(ctx, x, y, eyesX, eyesY) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo((x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
    ctx.bezierCurveTo((x - 15) + 5 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 4 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 5 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 14 + eyesY);
    ctx.bezierCurveTo((x - 15) + 11 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 12 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 11 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
    
    ctx.moveTo((x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
    ctx.bezierCurveTo((x - 15) + 17 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 16 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 17 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 14 + eyesY);
    ctx.bezierCurveTo((x - 15) + 23 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 19 + eyesY);
    ctx.bezierCurveTo((x - 15) + 24 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 23 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
    ctx.fill();

    drawPupils(ctx, x, y, eyesX, eyesY);
}

function drawPupils(ctx, x, y, eyesX, eyesY) {
    ctx.fillStyle = "#0000fa";
    ctx.beginPath();
    ctx.arc((x - 15) + 18 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc((x - 15) + 6 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawGhostAfraid(ctx, x, y, a) {
    ctx.fillStyle = (a === 1) ? "#ee2933" : "#e5bed0";
    ctx.beginPath();
    ctx.arc((x - 15) + 18, (y + 13) - 17, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc((x - 15) + 10, (y + 13) - 17, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.strokeStyle = (a === 1) ? "#ee2933" : "#e5bed0";
    ctx.beginPath();
    ctx.lineTo((x - 14.333) + 24, (y + 6));
    ctx.lineTo((x - 14.333) + 21, (y + 6) - 3);    
    ctx.lineTo((x - 14.333) + 17, (y + 6));
    ctx.lineTo((x - 14.333) + 14, (y + 6) - 3);
    ctx.lineTo((x - 14.333) + 10, (y + 6));
    ctx.lineTo((x - 14.333) + 7, (y + 6) - 3);
    ctx.lineTo((x - 14.333) + 3, (y + 6));
    ctx.stroke();
}
