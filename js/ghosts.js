let GHOST_BLINKY_CANVAS_CONTEXT = null;
let GHOST_BLINKY_POSITION_X = 276;
let GHOST_BLINKY_POSITION_Y = 204;
let GHOST_BLINKY_DIRECTION = 1;
const GHOST_BLINKY_COLOR = "#ed1b24";
let GHOST_BLINKY_MOVING_TIMER = -1;
let GHOST_BLINKY_MOVING = false;
let GHOST_BLINKY_BODY_STATE = 0;
let GHOST_BLINKY_STATE = 0;
let GHOST_BLINKY_EAT_TIMER = null;
let GHOST_BLINKY_AFFRAID_TIMER = null;
let GHOST_BLINKY_AFFRAID_STATE = 0;
let GHOST_BLINKY_TUNNEL = false;

let GHOST_PINKY_CANVAS_CONTEXT = null;
let GHOST_PINKY_POSITION_X = 276;
let GHOST_PINKY_POSITION_Y = 258;
let GHOST_PINKY_DIRECTION = 2;
const GHOST_PINKY_COLOR = "#feaec9";
let GHOST_PINKY_MOVING_TIMER = -1;
let GHOST_PINKY_MOVING = false;
let GHOST_PINKY_BODY_STATE = 1;
let GHOST_PINKY_STATE = 0;
let GHOST_PINKY_EAT_TIMER = null;
let GHOST_PINKY_AFFRAID_TIMER = null;
let GHOST_PINKY_AFFRAID_STATE = 0;
let GHOST_PINKY_TUNNEL = false;

let GHOST_INKY_CANVAS_CONTEXT = null;
let GHOST_INKY_POSITION_X = 238;
let GHOST_INKY_POSITION_Y = 258;
let GHOST_INKY_DIRECTION = 3;
const GHOST_INKY_COLOR = "#4adecb";
let GHOST_INKY_MOVING_TIMER = -1;
let GHOST_INKY_MOVING = false;
let GHOST_INKY_BODY_STATE = 2;
let GHOST_INKY_STATE = 0;
let GHOST_INKY_EAT_TIMER = null;
let GHOST_INKY_AFFRAID_TIMER = null;
let GHOST_INKY_AFFRAID_STATE = 0;
let GHOST_INKY_TUNNEL = false;

let GHOST_CLYDE_CANVAS_CONTEXT = null;
let GHOST_CLYDE_POSITION_X = 314;
let GHOST_CLYDE_POSITION_Y = 258;
let GHOST_CLYDE_DIRECTION = 4;
const GHOST_CLYDE_COLOR = "#f99c00";
let GHOST_CLYDE_MOVING_TIMER = -1;
let GHOST_CLYDE_MOVING = false;
let GHOST_CLYDE_BODY_STATE = 3;
let GHOST_CLYDE_STATE = 0;
let GHOST_CLYDE_EAT_TIMER = null;
let GHOST_CLYDE_AFFRAID_TIMER = null;
let GHOST_CLYDE_AFFRAID_STATE = 0;
let GHOST_CLYDE_TUNNEL = false;

const GHOST_AFFRAID_COLOR = "#2d3eff";
const GHOST_AFFRAID_FINISH_COLOR = "#fff";
const GHOST_POSITION_STEP = 2;
const GHOST_MOVING_SPEED = 15;
const GHOST_TUNNEL_MOVING_SPEED = 35;
const GHOST_AFFRAID_MOVING_SPEED = 40;
const GHOST_EAT_MOVING_SPEED = 6;
const GHOST_AFFRAID_TIME = 8500;
const GHOST_EAT_TIME = 5500;
const GHOST_BODY_STATE_MAX = 6;

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
    const canvas = document.getElementById('canvas-ghost-' + ghost);
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

	const ctx = getGhostCanevasContext(ghost);

	const ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    const ghostColor = window['GHOST_' + ghost.toUpperCase() + '_COLOR'];
    const ghostAffraidState = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'];

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
    const affraidTimer = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'];
    
    if (affraidTimer !== null) { 
        affraidTimer.cancel();
        window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'] = null;
    }
    window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'] = 0;

    const ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    if (ghostState === 0 || ghostState === 1) {
        stopGhost(ghost);
        window['GHOST_' + ghost.toUpperCase() + '_STATE'] = 1;
        moveGhost(ghost);
        window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'] = new Timer("cancelAffraidGhost('" + ghost + "')", GHOST_AFFRAID_TIME);
    }
}

function cancelAffraidGhost(ghost) { 
    const ghostState = window['GHOST_' + ghost.toUpperCase() + '_STATE'];
    const affraidTimer = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'];
    
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

function moveGhost(ghost) {
    if (!window['GHOST_' + ghost.toUpperCase() + '_MOVING']) {
        window['GHOST_' + ghost.toUpperCase() + '_MOVING'] = true;

        let speed = -1;
        if (window['GHOST_' + ghost.toUpperCase() + '_STATE'] === 1) {
            speed = GHOST_AFFRAID_MOVING_SPEED;
        } else if (window['GHOST_' + ghost.toUpperCase() + '_STATE'] === 0) {
            speed = window['GHOST_' + ghost.toUpperCase() + '_TUNNEL'] ? GHOST_TUNNEL_MOVING_SPEED : GHOST_MOVING_SPEED;
        } else {
            speed = GHOST_EAT_MOVING_SPEED;
        }
        window['GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER'] = setInterval(() => moveGhost(ghost), speed);
    } else {
        changeDirection(ghost);

        const affraidTimer = window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'];
        if (affraidTimer) {
            const remain = affraidTimer.remain();
            if ((remain >= 2500 && remain < 3000) || (remain >= 1500 && remain <= 2000) || (remain >= 500 && remain <= 1000) || (remain < 0)) {
                window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'] = 1;
            } else if ((remain > 2000 && remain < 2500) || (remain > 1000 && remain < 1500) || (remain >= 0 && remain < 500)) {
                window['GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE'] = 0;
            }
        }

        if (canMoveGhost(ghost)) {
            eraseGhost(ghost);
            if (window['GHOST_' + ghost.toUpperCase() + '_BODY_STATE'] < GHOST_BODY_STATE_MAX) {
                window['GHOST_' + ghost.toUpperCase() + '_BODY_STATE']++;
            } else {
                window['GHOST_' + ghost.toUpperCase() + '_BODY_STATE'] = 0;
            }

            switch (window['GHOST_' + ghost.toUpperCase() + '_DIRECTION']) {
                case 1:
                    window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] += GHOST_POSITION_STEP;
                    break;
                case 2:
                    window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] += GHOST_POSITION_STEP;
                    break;
                case 3:
                    window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] -= GHOST_POSITION_STEP;
                    break;
                case 4:
                    window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] -= GHOST_POSITION_STEP;
                    break;
            }

            if (window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] === 2 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] === 258) {
                window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] = 548;
                window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] = 258;
            } else if (window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] === 548 && window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] === 258) {
                window['GHOST_' + ghost.toUpperCase() + '_POSITION_X'] = 2;
                window['GHOST_' + ghost.toUpperCase() + '_POSITION_Y'] = 258;
            }

            drawGhost(ghost);

            if (window['GHOST_' + ghost.toUpperCase() + '_BODY_STATE'] === 3 && window['GHOST_' + ghost.toUpperCase() + '_STATE'] !== -1) {
                if (!PACMAN_MOVING) {
                    testGhostPacman(ghost);
                }
                testGhostTunnel(ghost);
            }
        } else {
            window['GHOST_' + ghost.toUpperCase() + '_DIRECTION'] = oneDirection();
        }
    }
}


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

function changeDirection(ghost) {
    const ghostUpper = ghost.toUpperCase();
        const ghostProperties = {
        direction: window[`GHOST_${ghostUpper}_DIRECTION`],
        state: window[`GHOST_${ghostUpper}_STATE`],
        positionX: window[`GHOST_${ghostUpper}_POSITION_X`],
        positionY: window[`GHOST_${ghostUpper}_POSITION_Y`]
    };

    let tryDirection = oneDirection();

    if (ghostProperties.state === 0 || ghostProperties.state === 1) { 
        if (ghostProperties.positionX !== 276 && ghostProperties.positionY !== 258) { 
            let pacmanX = PACMAN_POSITION_X;
            let pacmanY = PACMAN_POSITION_Y;
            let axe = oneAxe();

            if (ghost === "blinky") { 
                let nothing = whatsYourProblem();
                if (nothing < 6) { 
                    tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    if (!(canMoveGhost(ghost, tryDirection) && (ghostProperties.direction !== tryDirection - 2 && ghostProperties.direction !== tryDirection + 2))) { 
                        axe++;
                        if (axe > 2) axe = 1; 
                        tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    }
                }
            } else if (ghost === "pinky") { 
                let nothing = whatsYourProblem();
                if (nothing < 3) { 
                    tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    if (!(canMoveGhost(ghost, tryDirection) && (ghostProperties.direction !== tryDirection - 2 && ghostProperties.direction !== tryDirection + 2))) { 
                        axe++;
                        if (axe > 2) axe = 1; 
                        tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    }
                    tryDirection = reverseDirection(tryDirection);
                }
            } else if (ghost === "inky") { 
                let good = anyGoodIdea();
                if (good < 3) { 
                    tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    if (!(canMoveGhost(ghost, tryDirection) && (ghostProperties.direction !== tryDirection - 2 && ghostProperties.direction !== tryDirection + 2))) { 
                        axe++;
                        if (axe > 2) axe = 1; 
                        tryDirection = getRightDirection(axe, ghostProperties.positionX, ghostProperties.positionY, pacmanX, pacmanY);
                    }
                }
            }
        }
        if (ghostProperties.state === 1) { 
            tryDirection = reverseDirection(tryDirection);
        }
    } else { 
        let axe = oneAxe();
        tryDirection = getRightDirectionForHome(axe, ghostProperties.positionX, ghostProperties.positionY);
        if (canMoveGhost(ghost, tryDirection) && (ghostProperties.direction !== tryDirection - 2 && ghostProperties.direction !== tryDirection + 2)) { 
        } else { 
            axe++;
            if (axe > 2) axe = 1; 
            tryDirection = getRightDirectionForHome(axe, ghostProperties.positionX, ghostProperties.positionY);
        }
    }

    if (canMoveGhost(ghost, tryDirection) && (ghostProperties.direction !== tryDirection - 2 && ghostProperties.direction !== tryDirection + 2)) { 
        window[`GHOST_${ghostUpper}_DIRECTION`] = tryDirection; 
    }
}


function getRightDirectionForHome(axe, ghostX, ghostY) { 
	let homeX = 276;
	let homeY = 204;
	
	if (ghostY === 204 && ghostX === 276) { 	
		return 2;
	} else if (ghostX === 276 && ghostY === 258) { 
		return oneDirectionX();
	} else { 
		if (axe === 1) { 
			if (ghostX > homeX) { 
			 return 3;
			} else { 
				return 1;
			}
		} else { 
			if (ghostY > homeY) { 
			 return 4;
			} else { 
				return 2;
			}
		}
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
		ctx.beginPath();
		ctx.moveTo((x - 15), (y + 16));
		ctx.lineTo((x - 15), (y + 16) - 18);
		ctx.bezierCurveTo((x - 15), (y + 16) - 26, (x - 15) + 6, (y + 16) - 32, (x - 15) + 14, (y + 16) - 32);
		ctx.bezierCurveTo((x - 15) + 22, (y + 16) - 32, (x - 15) + 28, (y + 16) - 26, (x - 15) + 28, (y + 16) - 18);
		ctx.lineTo((x - 15) + 28, (y + 16));
		if (b < 4) { 
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
		ctx.lineTo((x - 15), (y + 16) );
		ctx.fill();
	}

	let eyesX = 0;
	let eyesY = 0;
	
	if (d === 4) { 
		eyesY = -5;
	} else if (d === 1) { 
		eyesX = +2;
	} else if (d === 2) { 
		eyesY = 0;
		eyesY = +5;
	} else if (d === 3) { 
		eyesX = -3;
	}

	if (s === 0 || s === -1) { 
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
		
		if (d === 4) { 
			eyesY = -9;
			eyesX = 2;
		} else if (d === 1) { 
			eyesX = +6;
		} else if (d === 2) { 
			eyesY = +8;
			eyesX = 2;
		} else if (d === 3) { 
			
		}
		
		ctx.fillStyle = "#0000fa";
		ctx.beginPath();
		ctx.arc((x - 15) + 18 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
		ctx.fill();

		ctx.beginPath();
		ctx.arc((x - 15) + 6 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
		ctx.fill();
	} else { 
		if (a === 1) { 
			ctx.fillStyle = "#ee2933";
		} else { 
			ctx.fillStyle = "#e5bed0";
		}
		ctx.beginPath();
		ctx.arc((x - 15) + 18, (y + 13) - 17, 2, 0, Math.PI * 2, true);
		ctx.fill();

		ctx.beginPath();
		ctx.arc((x - 15) + 10, (y + 13) - 17, 2, 0, Math.PI * 2, true);
		ctx.fill();
		
		if (a === 1) { 
			ctx.strokeStyle = "#ee2933";
		} else { 
			ctx.strokeStyle = "#e5bed0";
		}
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
}