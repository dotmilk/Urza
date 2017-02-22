var Swapper = function(c, b) {
    function a(e, d, f, g) {
        a._swapper(e, d, f, g)
    }
    if (c && c.fn) {
        c.extend(c.fn, {
            swapper: function(d, e, f) {
                d = c(d)[0];
                this.forEach(function(g) {
                    a._swapper(g, d, e, f)
                });
                return this
            }
        })
    }
    if (b && b.fn) {
        b.fn.swapper = function(d, e, f) {
            d = b(d)[0];
            this.each(function() {
                a._swapper(this, d, e, f)
            });
            return this
        }
    }
    return a
}(window.Zepto, window.jQuery);
Swapper._os = function(f, d) {
    var c, a, b;
    if (b = /\bCPU.*OS (\d+(_\d+)?)/i.exec(f)) {
        c = "ios";
        a = b[1].replace("_", ".")
    } else {
        if (b = /\bAndroid (\d+(\.\d+)?)/.exec(f)) {
            c = "android";
            a = b[1]
        }
    }
    var e = {
        name: c,
        version: a && d(a)
    };
    e[c] = true;
    return e
}(navigator.userAgent, parseFloat);
Swapper._isNode = function(a, b) {
    return function(d) {
        if (!d) {
            return false
        }
        try {
            return (d instanceof a) || (d instanceof b)
        } catch (c) {}
        if (typeof d !== "object") {
            return false
        }
        if (typeof d.nodeType !== "number") {
            return false
        }
        if (typeof d.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Swapper._isInDOM = function(a) {
    return function(c, b) {
        if (!b && !a(c)) {
            throw TypeError("element must be a DOM node, got " + c)
        }
        while (c = c.parentNode) {
            if (c === document) {
                return true
            }
        }
        return false
    }
}(Swapper._isNode);
Swapper._insertBefore = function() {
    return function(a, b) {
        b.parentNode.insertBefore(a, b)
    }
}();
Swapper._insertAfter = function() {
    return function(a, c) {
        var b = c.parentNode;
        if (b.lastchild === c) {
            b.appendChild(a)
        } else {
            b.insertBefore(a, c.nextSibling)
        }
    }
}();
Swapper._removeNode = function() {
    return function(a) {
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
    }
}();
Swapper._setTransform = function() {
    return function(b, a) {
        b.style["-webkit-transform"] = a;
        b.style["-moz-transform"] = a;
        b.style["-ms-transform"] = a;
        b.style["-o-transform"] = a;
        b.style.transform = a
    }
}();
Swapper._setTransition = function() {
    return function(a, b) {
        if (b) {
            a.style["-webkit-transition"] = "-webkit-" + b;
            a.style["-moz-transition"] = "-moz-" + b;
            a.style["-ms-transition"] = "-ms-" + b;
            a.style["-o-transition"] = "-o-" + b;
            a.style.transition = b
        } else {
            a.style["-webkit-transition"] = "";
            a.style["-moz-transition"] = "";
            a.style["-ms-transition"] = "";
            a.style["-o-transition"] = "";
            a.style.transition = ""
        }
    }
}();
Swapper._getStyles = function(a) {
    return function(c, d) {
        var b;
        if (d) {
            b = c.style
        } else {
            b = a.defaultView.getComputedStyle(c, null)
        }
        return {
            "-webkit-transition": b["-webkit-transition"],
            "-moz-transition": b["-moz-transition"],
            "-ms-transition": b["-ms-transition"],
            "-o-transition": b["-o-transition"],
            transition: b.transition,
            display: b.display,
            opacity: b.opacity,
            top: b.top,
            left: b.left,
            height: b.height,
            width: b.width,
            position: b.position
        }
    }
}(document);
Swapper._easings = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "step-start": "step-start",
    "step-end": "step-end"
};
Swapper._transitions = {
    fade: [{
        fade: true
    }, {
        fade: true
    }],
    "fade-on": [{
        fade: true
    }, {}],
    "fade-off": [{}, {
        fade: true
    }, true],
    "scale-in": [{
        transform: "scale(0.01)"
    }, {}],
    "scale-out": [{}, {
        transform: "scale(0.01)"
    }, true],
    "rotate-left": [{
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }],
    "rotate-right": [{
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }],
    "cube-left": [{
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "cube-right": [{
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-left": [{
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-right": [{
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "explode-in": [{
        fade: true,
        transform: "scale(1.25)"
    }, {}],
    "explode-out": [{}, {
        fade: true,
        transform: "scale(1.25)"
    }, true],
    "implode-in": [{}, {
        fade: true,
        transform: "scale(0.60)"
    }, true],
    "implode-out": [{
        fade: true,
        transform: "scale(0.80)"
    }, {}],
    "slide-left": [{
        transform: "translate3d( 100%,0,0)"
    }, {
        transform: "translate3d(-100%,0,0)"
    }],
    "slide-right": [{
        transform: "translate3d(-100%,0,0)"
    }, {
        transform: "translate3d( 100%,0,0)"
    }],
    "slide-up": [{
        transform: "translate3d(0, 100%,0)"
    }, {
        transform: "translate3d(0,-100%,0)"
    }],
    "slide-down": [{
        transform: "translate3d(0,-100%,0)"
    }, {
        transform: "translate3d(0, 100%,0)"
    }],
    "slideon-left": [{
        transform: "translate3d(-100%,0,0)"
    }, {}],
    "slideoff-left": [{}, {
        transform: "translate3d(-100%,0,0)"
    }, true],
    "slideon-right": [{
        transform: "translate3d(100%,0,0)"
    }, {}],
    "slideoff-right": [{}, {
        transform: "translate3d(100%,0,0)"
    }, true],
    "slideon-up": [{
        transform: "translate3d(0,-100%,0)"
    }, {}],
    "slideoff-up": [{}, {
        transform: "translate3d(0,-100%,0)"
    }, true],
    "slideon-down": [{
        transform: "translate3d(0,100%,0)"
    }, {}],
    "slideoff-down": [{}, {
        transform: "translate3d(0,100%,0)"
    }, true],
    "slideon-left-ios": [{
        transform: "translate3d(100%,0,0)"
    }, {
        transform: "translate3d(-30%,0,0)"
    }],
    "slideoff-right-ios": [{
        transform: "translate3d(-30%,0,0)"
    }, {
        transform: "translate3d(100%,0,0)"
    }, true],
    "glideon-right": [{
        transform: "translate3d(110%,0,0)"
    }, {
        transform: "translate3d(-20%,0,0)"
    }],
    "glideoff-right": [{
        transform: "translate3d(-20%,0,0)"
    }, {
        transform: "translate3d(110%,0,0)"
    }, true],
    "glideon-left": [{
        transform: "translate3d(-110%,0,0)"
    }, {
        transform: "translate3d(20%,0,0)"
    }],
    "glideoff-left": [{
        transform: "translate3d(20%,0,0)"
    }, {
        transform: "translate3d(-110%,0,0)"
    }, true],
    "glideon-down": [{
        transform: "translate3d(0,110%,0)"
    }, {
        transform: "translate3d(0,-20%,0)"
    }],
    "glideoff-down": [{
        transform: "translate3d(0,-20%,0)"
    }, {
        transform: "translate3d(0,110%,0)"
    }, true],
    "glideon-up": [{
        transform: "translate3d(0,-110%,0)"
    }, {
        transform: "translate3d(0,20%,0)"
    }],
    "glideoff-up": [{
        transform: "translate3d(0,20%,0)"
    }, {
        transform: "translate3d(0,-110%,0)"
    }, true],
    "android-l-in": [{
        transform: "translate3d(0,6%,0)",
        fade: true
    }, {}],
    "android-l-out": [{}, {
        transform: "translate3d(0,6%,0)",
        fade: true
    }, true]
};
Swapper._validate = function(e, f, d) {
    return {
        element: c,
        options: b,
        callback: a
    };

    function c(g) {
        if (!e(g)) {
            throw TypeError("element must be a DOM node, got " + g)
        }
    }

    function b(g) {
        switch (typeof g) {
            case "string":
                g = {
                    transition: g
                };
                break;
            case "undefined":
                g = {};
                break;
            case "object":
                break;
            default:
                throw TypeError("options must be an object if defined, got " + g)
        }
        switch (typeof g.transition) {
            case "string":
                if (!(g.transition in f) && (g.transition !== "instant")) {
                    throw TypeError(g.transition + " is not a valid transition")
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("transition must be a string if defined, got " + g.transition)
        }
        switch (typeof g.duration) {
            case "number":
                if (g.duration < 0) {
                    throw TypeError("duration must be a non-negative integer, got " + g.duration)
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("duration must be a number if defined, got " + g.duration)
        }
        switch (typeof g.easing) {
            case "string":
                if (!(g.easing in d) && (g.easing.substr(0, 13) !== "cubic-bezier(")) {
                    throw TypeError(g.easing + " is not a valid easing")
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("easing must be a string if defined, got " + g.easing)
        }
        return g
    }

    function a(g) {
        switch (typeof g) {
            case "undefined":
                g = function() {};
                break;
            case "function":
                break;
            default:
                throw TypeError("callback must be a function if defined, got " + g)
        }
        return g
    }
}(Swapper._isNode, Swapper._transitions, Swapper._easings);
Swapper._swapper = function(k, w, f, e, A, x, g, h, j, D, l, q, m, s) {
    var a = "translate3d(0,0,0) scale(1)",
        E = "fade",
        z = "ease-in-out";
    var p = (k.ios && (Math.floor(k.version) === 5));

    function r(G, F, H, I) {
        q.element(G);
        q.element(F);
        if (typeof H === "function") {
            I = H;
            H = {}
        }
        H = q.options(H);
        I = q.callback(I);
        if (G._swapper) {
            throw Error("elem1 is currently being swapped")
        } else {
            if (F._swapper) {
                throw Error("elem2 is currently being swapped")
            }
        }
        if (!f(G, true)) {
            throw Error("elem1 must be in the DOM to be swapped")
        }
        G._swapper = true;
        F._swapper = true;
        x(F);
        o(G, F, H, function() {
            G._swapper = false;
            F._swapper = false;
            I()
        })
    }

    function o(O, N, P, M) {
        if (P.transition === "instant") {
            A(N, O);
            x(O);
            M();
            return
        }
        var L = D[P.transition || E],
            K = P.easing || z,
            J = P.duration || 300;
        if (K.substr(0, 13) !== "cubic-bezier(") {
            K = l[K]
        }
        A(N, O);
        var I = j(O),
            H = j(N),
            G = j(O, true),
            F = j(N, true);
        C(O, N, I, H);
        if (L[2]) {
            e(N, O)
        }
        N.style.opacity = "0";
        u(O, N);
        setTimeout(function() {
            N.style.opacity = H.opacity;
            b(O, N, L);
            setTimeout(function() {
                n(O, N, J, K);
                setTimeout(function() {
                    y(O, N, L);
                    B(O, N, I, H, L, J, function() {
                        x(O);
                        t(O, N, J, K);
                        setTimeout(function() {
                            v(O, N, G, F, L);
                            d(O, N, G, F);
                            setTimeout(function() {
                                c(O, N, G, F);
                                M()
                            }, 0)
                        }, 0)
                    })
                }, 0)
            }, 50)
        }, 0)
    }

    function C(G, F, I, H) {
        var J = G.getBoundingClientRect();
        if (I.display !== "none") {
            if (p) {
                F.style.position = "absolute"
            } else {
                F.style.position = "fixed"
            }
            F.style.top = J.top + "px";
            F.style.left = J.left + "px"
        }
        F.style.height = H.height || I.height;
        F.style.width = H.width || I.width
    }

    function d(G, F, I, H) {
        F.style.position = H.position;
        F.style.top = H.top;
        F.style.left = H.left;
        F.style.height = H.height;
        F.style.width = H.width
    }

    function b(G, F, H) {
        g(G, a);
        g(F, H[0].transform || a);
        if (H[0].fade) {
            F.style.opacity = "0"
        }
        if (H[1].fade) {
            G.style.opacity = "1"
        }
    }

    function y(G, F, H) {
        g(G, H[1].transform || a);
        g(F, a);
        if (H[0].fade) {
            F.style.opacity = "1"
        }
        if (H[1].fade) {
            G.style.opacity = "0"
        }
    }

    function v(G, F, I, H, J) {
        g(G, "");
        g(F, "");
        if (J[0].fade) {
            F.style.opacity = H.opacity
        }
        if (J[1].fade) {
            G.style.opacity = I.opacity
        }
    }

    function n(G, F, H, J) {
        var I = "transform " + (H / 1000) + "s " + J + ",opacity " + (H / 1000) + "s " + J;
        h(G, I);
        h(F, I)
    }

    function t(G, F, H, I) {
        h(G, "");
        h(F, "")
    }

    function u(G, F) {
        h(G, "");
        h(F, "")
    }

    function c(G, F, I, H) {
        G.style["-webkit-transition"] = I["-webkit-transition"];
        G.style["-moz-transition"] = I["-moz-transition"];
        G.style["-ms-transition"] = I["-ms-transition"];
        G.style["-o-transition"] = I["-o-transition"];
        G.style.transition = I.transition;
        F.style["-webkit-transition"] = H["-webkit-transition"];
        F.style["-moz-transition"] = H["-moz-transition"];
        F.style["-ms-transition"] = H["-ms-transition"];
        F.style["-o-transition"] = H["-o-transition"];
        F.style.transition = H.transition
    }

    function i(F, G) {
        if (F.display === "none") {
            return false
        }
        if (G.fade) {
            return true
        }
        if (!G.transform) {
            return false
        } else {
            if (G.transform === a) {
                return false
            } else {
                return true
            }
        }
    }

    function B(Q, N, H, F, K, I, M) {
        var G;
        if (i(F, K[0])) {
            G = N;
            P()
        } else {
            if (i(H, K[1])) {
                G = Q;
                P()
            } else {
                setTimeout(L, I)
            }
        }

        function P() {
            G.addEventListener("webkitTransitionEnd", L, false);
            G.addEventListener("transitionend", L, false);
            G.addEventListener("oTransitionEnd", L, false);
            G.addEventListener("otransitionend", L, false);
            G.addEventListener("MSTransitionEnd", L, false);
            G.addEventListener("transitionend", L, false)
        }

        function O() {
            G.removeEventListener("webkitTransitionEnd", L);
            G.removeEventListener("transitionend", L);
            G.removeEventListener("oTransitionEnd", L);
            G.removeEventListener("otransitionend", L);
            G.removeEventListener("MSTransitionEnd", L);
            G.removeEventListener("transitionend", L)
        }
        var J = false;

        function L(R) {
            if (J || !R || !R.target || (R.target !== G)) {
                return
            }
            J = true;
            if (G) {
                O()
            }
            M()
        }
    }
    return r
}(Swapper._os, Swapper._isNode, Swapper._isInDOM, Swapper._insertBefore, Swapper._insertAfter, Swapper._removeNode, Swapper._setTransform, Swapper._setTransition, Swapper._getStyles, Swapper._transitions, Swapper._easings, Swapper._validate, window, document);
