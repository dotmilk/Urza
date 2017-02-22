class Utils {
    constructor() {
        this.animationQueue = undefined
    }

    forEach(arr, callback, self){
        return Array.prototype.forEach.call(arr, callback, self)
    }

    isArray(arr) {
        return Array.isArray(arr)
    }

    isNode(elem) {
	if ( !elem ) {
	    return false
	}

	try {
	    return (elem instanceof Node) || (elem instanceof HTMLElement)
	} catch (err) {}

	if (typeof elem !== 'object') {
	    return false
	}

	if (typeof elem.nodeType !== 'number') {
	    return false
	}

	if (typeof elem.nodeName !== 'string') {
	    return false
	}

	return true;
    }

    isjQueryElem($elem) {
	if (typeof $elem !== 'object' || $elem === null) {
	    return false
	} else {
	    return ($elem.val && $elem.addClass && $elem.css && $elem.html && $elem.show)
	}
    }

    onReady (func) {
	if (document.readyState === 'complete') {
	    setTimeout(function () {
		func();
	    }, 0);
	    return;
	}

	window.addEventListener('load', runCallback, false);

	function runCallback () {
	    window.removeEventListener('load', runCallback);

	    setTimeout(function () {
		func();
	    }, 0);
	}
    }

    queueAnimation(func) {
	if (this.animationQueue) {
	    this.animationQueue.push(func)
	} else {
	    this.animationQueue = [func]
	    flushAnimations()
	}
    }

    flushAnimations() {
	var anim = animationQueue.shift()
	if (anim) {
	    onReady(function () {
		var unlocked = false
		function unlock() {
		    // prevent unlocking mult. times
		    if (unlocked) {
			return
		    }
		    unlocked = true
		    setTimeout(foregroundFlush, 0)
		}
		anim(unlock)
	    })
	} else {
	    animationQueue = null
	}
    }

    setTransform(elem, transform) {
	elem.style['-webkit-transform'] = transform
	elem.style[   '-moz-transform'] = transform
	elem.style[    '-ms-transform'] = transform
	elem.style[     '-o-transform'] = transform
	elem.style[        'transform'] = transform
    }

    setTransition (elem, transition) {
	if (transition) {
	    elem.style['-webkit-transition'] = '-webkit-'+transition
	    elem.style[   '-moz-transition'] =    '-moz-'+transition
	    elem.style[    '-ms-transition'] =     '-ms-'+transition
	    elem.style[     '-o-transition'] =      '-o-'+transition
	    elem.style[        'transition'] =            transition
	}
	else {
	    elem.style['-webkit-transition'] = ''
	    elem.style[   '-moz-transition'] = ''
	    elem.style[    '-ms-transition'] = ''
	    elem.style[     '-o-transition'] = ''
	    elem.style[        'transition'] = ''
	}
    }

    getStyles (elem, notComputed) {
	var styles

	if (notComputed) {
	    styles = elem.style
	}
	else {
	    styles = document.defaultView.getComputedStyle(elem, null)
	}

	return {
	    display          : styles.display          ,
	    opacity          : styles.opacity          ,
	    paddingRight     : styles.paddingRight     ,
	    paddingLeft      : styles.paddingLeft      ,
	    marginRight      : styles.marginRight      ,
	    marginLeft       : styles.marginLeft       ,
	    borderRightWidth : styles.borderRightWidth ,
	    borderLeftWidth  : styles.borderLeftWidth  ,
	    top              : styles.top              ,
	    left             : styles.left             ,
	    height           : styles.height           ,
	    width            : styles.width            ,
	    position         : styles.position
	}
    }

    isVisible (elem) {
	var styles = getStyles(elem)
	return (styles.display !== 'none' && styles.opacity !== '0')
    }

    transitionElems(transitions, timeout, easing, callback) {
	if (typeof transitions.length !== 'number') {
	    transitions = [ transitions ]
	}

	var opacities = transitions.map(function (transition) {
	    return transition.elem.style.opacity
	})

	setInitialStyles(function () {
	    animateElems(function () {
		restoreStyles(function () {
		    callback()
		})
	    })
	})

	function setInitialStyles (callback) {
	    this.forEach(transitions, function (transition) {
		if (typeof transition.transitionStart !== 'undefined') {
		    setTransform(transition.elem, transition.transitionStart)
		}
		if (typeof transition.opacityStart !== 'undefined') {
		    transition.elem.style.opacity = transition.opacityStart + ''
		}
	    })

	    setTimeout(function () {
		this.forEach(transitions, function (transition) {
		    var e                = transition.easing||easing,
			transitionString = 'transform '+(timeout/1000)+'s '+e+', opacity '+(timeout/1000)+'s '+e
		    setTransition(transition.elem, transitionString)
		})

		setTimeout(callback, 0)
	    }, 0)
	}

	function animateElems (callback) {
	    this.forEach(transitions, function (transition) {
		if (typeof transition.transitionEnd !== 'undefined') {
		    setTransform(transition.elem, transition.transitionEnd)
		}
		if (typeof transition.opacityEnd !== 'undefined') {
		    transition.elem.style.opacity = transition.opacityEnd + ''
		}
	    })

	    var lastTransition = transitions[transitions.length-1]
	    lastTransition.elem.addEventListener('webkitTransitionEnd' , transitionFinished , false)
	    lastTransition.elem.addEventListener('transitionend'       , transitionFinished , false)
	    lastTransition.elem.addEventListener('onTransitionEnd'     , transitionFinished , false)
	    lastTransition.elem.addEventListener('ontransitionend'     , transitionFinished , false)
	    lastTransition.elem.addEventListener('MSTransitionEnd'     , transitionFinished , false)
	    lastTransition.elem.addEventListener('transitionend'       , transitionFinished , false)

	    var done = false

	    function transitionFinished (e) {
		if (done || (e.target !== lastTransition.elem)) {
		    return
		}
		done = true

		this.forEach(transitions, function (transition) {
		    lastTransition.elem.removeEventListener('webkitTransitionEnd' , transitionFinished)
		    lastTransition.elem.removeEventListener('transitionend'       , transitionFinished)
		    lastTransition.elem.removeEventListener('onTransitionEnd'     , transitionFinished)
		    lastTransition.elem.removeEventListener('ontransitionend'     , transitionFinished)
		    lastTransition.elem.removeEventListener('MSTransitionEnd'     , transitionFinished)
		    lastTransition.elem.removeEventListener('transitionend'       , transitionFinished)
		})

		callback()
	    }
	}

	function restoreStyles (callback) {
	    this.forEach(transitions, function (transition) {
		setTransition(transition.elem, '')
	    })

	    setTimeout(function () {
		this.forEach(transitions, function (transition, i) {
		    setTransform(transition.elem, '')
		    transition.elem.style.opacity = opacities[i]
		})

		callback()
	    }, 0)
	}
    }
}
