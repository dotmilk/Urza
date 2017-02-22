var Clickable = function(c, b) {
    function a() {
        a._enableClicking.apply(this, arguments)
    }
    a.touchable = function() {
        return a._os.touchable
    };
    a.sticky = function() {
        a._enableStickyClick.apply(this, arguments)
    };
    a.unsticky = function(d) {
        if (typeof d === "object" && d && typeof d._removeStickyClick === "function") {
            d._removeStickyClick()
        }
    };
    if (b && b.fn) {
        b.fn.clickable = function(d) {
            this.each(function() {
                a._enableClicking(this, d)
            });
            return this
        };
        b.fn.stickyClick = function(d) {
            this.each(function() {
                a._enableStickyClick(this, d)
            });
            return this
        };
        b.fn.unstickyClick = function(d) {
            this.each(function() {
                a.unsticky(this)
            });
            return this
        }
    }
    if (c && c.fn) {
        c.extend(c.fn, {
            clickable: function(d) {
                this.forEach(function(e) {
                    a._enableClicking(e, d)
                });
                return this
            },
            stickyClick: function(d) {
                this.forEach(function(e) {
                    a._enableStickyClick(e, d)
                });
                return this
            },
            unstickyClick: function(d) {
                this.forEach(function(e) {
                    a.unsticky(this)
                });
                return this
            }
        })
    }
    return a
}(window.Zepto, window.jQuery);
Clickable._os = function(f, d) {
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
        version: a && d(a),
        touchable: !!c
    };
    e[c] = true;
    return e
}(navigator.userAgent, parseFloat);
Clickable._trimString = function(a) {
    var b = /^\s+|\s+$/g;
    return function(c) {
        return a(c).replace(b, "")
    }
}(String);
Clickable._isDOMNode = function(a, b) {
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
Clickable._isInDOM = function() {
    return function(a) {
        while (a = a.parentNode) {
            if (a === document) {
                return true
            }
        }
        return false
    }
}();
Clickable._bindEvents = function() {
    return function(c, b) {
        for (var a in b) {
            if (c.addEventListener) {
                c.addEventListener(a, b[a], false)
            } else {
                if (c.attachEvent) {
                    c.attachEvent("on" + a, b[a])
                }
            }
        }
    }
}();
Clickable._unbindEvents = function() {
    return function(c, b) {
        for (var a in b) {
            if (c.removeEventListener) {
                c.removeEventListener(a, b[a])
            }
        }
    }
}();
Clickable._addClass = function() {
    return function(b, a) {
        b.className += " " + a
    }
}();
Clickable._removeClass = function(a) {
    return function(c, b) {
        c.className = a(c.className.replace(new RegExp("\\b" + b + "\\b"), ""))
    }
}(Clickable._trimString);
Clickable._enableClicking = function(h, o, a, f, c, k, n) {
    var i = "active",
        m = "data-clickable-class",
        g = 40;
    var p = false,
        l = !!h.ios;

    function b(L, O) {
        if (!o(L)) {
            throw TypeError("element " + L + " must be a DOM element")
        }
        if (L._clickable) {
            return
        }
        L._clickable = true;
        switch (typeof O) {
            case "undefined":
                O = i;
                break;
            case "string":
                break;
            default:
                throw TypeError("active class " + O + " must be a string")
        }
        var E = false,
            q = false,
            G, F, J, K, s;
        L.setAttribute(m, O);
        L.style["-webkit-tap-highlight-color"] = "rgba(255,255,255,0)";
        v();
        return;

        function M(Q, R) {
            E = true;
            J = +new Date();
            G = Q;
            F = R;
            K = j(L);
            if (K) {
                s = K.scrollTop;
                K.addEventListener("scroll", A, true)
            }
        }

        function I() {
            if (K) {
                K.removeEventListener("scroll", A)
            }
            K = null;
            s = null;
            G = null;
            F = null;
            E = false
        }

        function A() {
            B()
        }

        function P() {
            return E
        }

        function t() {
            k(L, O)
        }

        function r() {
            n(L, O)
        }

        function v() {
            f(L, {
                click: x
            });
            if (!h.touchable) {
                f(L, {
                    mousedown: C,
                    mousemove: D,
                    mouseout: D,
                    mouseup: z
                });
                return
            }
            if (h.ios) {
                f(L, {
                    DOMNodeInsertedIntoDocument: N,
                    DOMNodeRemovedFromDocument: y
                });
                if (a(L)) {
                    N()
                }
            } else {
                N()
            }
        }

        function N() {
            f(L, {
                touchstart: w,
                touchmove: H,
                touchcancel: B,
                touchend: u
            })
        }

        function y() {
            c(L, {
                touchstart: w,
                touchmove: H,
                touchcancel: B,
                touchend: u
            })
        }

        function x(Q) {
            Q = Q || window.event;
            if (!L.disabled && q) {
                q = false;
                setTimeout(function() {
                    p = false
                }, 0)
            } else {
                if (Q.stopImmediatePropagation) {
                    Q.stopImmediatePropagation()
                }
                Q.preventDefault();
                Q.stopPropagation();
                Q.cancelBubble = true;
                Q.returnValue = false;
                return false
            }
        }

        function C(Q) {
            q = false;
            if (L.disabled || !e(Q.target, L)) {
                Q.preventDefault();
                I();
                return
            }
            M(Q.clientX, Q.clientY);
            t()
        }

        function D(Q) {
            Q.preventDefault();
            I();
            q = false;
            r()
        }

        function z(Q) {
            if (L.disabled) {
                Q.preventDefault();
                I();
                q = false;
                return
            }
            if (!P()) {
                Q.preventDefault();
                q = false
            } else {
                q = true
            }
            I();
            r()
        }

        function w(Q) {
            q = false;
            if (p || L.disabled || (Q.touches.length !== 1) || !e(Q.target, L)) {
                I();
                return
            }
            p = true;
            var R = Q.changedTouches[0];
            M(R.clientX, R.clientY);
            if (K) {
                if (K._isScrolling || (s < 0) || (K.scrollHeight < s)) {
                    I();
                    return
                }
            }
            var R = J;
            setTimeout(function() {
                if (P() && (R === J)) {
                    t()
                }
            }, g)
        }

        function B(Q) {
            q = false;
            I();
            if (Q) {
                p = false
            }
            if (L.disabled) {
                return
            }
            r()
        }

        function H(R) {
            var Q = document.elementFromPoint(R.touches[0].pageX, R.touches[0].pageY);
            if (L !== Q) {
                B(R)
            }
        }

        function u(V) {
            var R = P(),
                S = K,
                T = s,
                Q = G,
                W = F;
            B();
            if (!R || L.disabled) {
                p = false;
                return
            }
            if (S) {
                if (S._isScrolling || (S.scrollTop !== T)) {
                    return
                }
            }
            if (!V.stopImmediatePropagation) {
                q = true;
                return
            }
            var U = +new Date() - J;
            if (U > g) {
                q = true;
                d(L, Q, W)
            } else {
                t();
                setTimeout(function() {
                    r();
                    q = true;
                    d(L, Q, W)
                }, 1)
            }
        }
    }

    function e(r, q) {
        do {
            if (r === q) {
                return true
            } else {
                if (r._clickable) {
                    return false
                }
            }
        } while (r = r.parentNode);
        return false
    }

    function d(s, q, t) {
        var r = document.createEvent("MouseEvents");
        r.initMouseEvent("click", true, true, window, 1, q || 0, t || 0, q || 0, t || 0, false, false, false, false, 0, null);
        s.dispatchEvent(r)
    }

    function j(q) {
        if (!h.ios || (h.version < 5)) {
            return
        }
        while (q = q.parentNode) {
            if (q._scrollable) {
                if (q._iScroll) {
                    return
                }
                return q
            }
        }
    }
    return b
}(Clickable._os, Clickable._isDOMNode, Clickable._isInDOM, Clickable._bindEvents, Clickable._unbindEvents, Clickable._addClass, Clickable._removeClass);
Clickable._enableStickyClick = function(a, c, f) {
    var d = "data-clickable-class";

    function e(i, h, g) {
        if (!c(i)) {
            throw TypeError("button must be a DOM element, got " + i)
        }
        switch (typeof h) {
            case "string":
                break;
            case "function":
                g = h;
                h = undefined;
                break;
            default:
                throw TypeError("button active class must be a string if defined, got " + h)
        }
        if (typeof g !== "function") {
            throw TypeError("sticky click handler must be a function, got " + g)
        }
        f(i, h);
        var j = b(i, g);
        i.addEventListener("click", j, false);
        if (i._removeStickyClick) {
            i._removeStickyClick = function() {
                i.removeEventListener("click", j)
            }
        }
    }

    function b(i, h) {
        var j = false,
            g = i.getAttribute(d);
        return function() {
            if (j) {
                return
            }
            j = true;
            var k = false,
                n;
            i.disabled = true;
            i.className += " " + g;
            try {
                n = h.call(i, m)
            } catch (l) {
                if (window.console && window.console.error) {
                    if ((typeof l === "object") && l.stack) {
                        window.console.error(l.stack)
                    } else {
                        window.console.error(l + "")
                    }
                }
                m()
            }
            if (n === false) {
                m()
            }

            function m() {
                if (k) {
                    return
                }
                k = true;
                j = false;
                if (i.disabled) {
                    i.disabled = false;
                    i.className = a(i.className.replace(new RegExp("\\b" + g + "\\b", "g"), ""))
                }
            }
        }
    }
    return e
}(Clickable._trimString, Clickable._isDOMNode, Clickable._enableClicking);
