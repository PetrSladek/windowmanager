
var windows = {

    startDrag: function(win, e) {
        e = e || window.event;

        win.desktop.element.style.cursor = 'move';

        var diffX = e.clientX - win.getX(),
            diffY = e.clientY - win.getY();

        // document on mouse move
        var mv = function(e){
            e = e || window.event;

            var x = e.clientX - diffX,
                y = e.clientY - diffY;

            win.setPosition(x, y);
        };
        // document on mouse up
        var up = function (e) {
            document.removeEventListener('mousemove', mv, true);
            document.removeEventListener('mouseup', up, true);

            win.desktop.element.style.cursor = '';
        }
        document.addEventListener('mousemove', mv, true);
        document.addEventListener('mouseup', up, true);

    },

    startResizeBottom: function (win, e) {
        var height = win.getHeight();
        var y = e.clientY;

        var mv = function(e){
            e = e || window.event;
            var diffY = e.clientY - y;
            win.setHeight(height+diffY);
        };
        var up = function (e) {
            document.removeEventListener('mousemove', mv, true);
            document.removeEventListener('mouseup', up, true);
        }
        document.addEventListener('mousemove', mv, true);
        document.addEventListener('mouseup', up, true);
    },
    startResizeTop: function (win, e) {
        var height = win.getHeight();
        var top = win.getY();
        var y = e.clientY;

        var mv = function(e){
            e = e || window.event;

            if(e.clientY < 0)
                return;

            var diffY = e.clientY - y;

            if(height-diffY <= win.resizeBound)
                return;
            win.setY(top+diffY);
            win.setHeight(height-diffY);
        }
        var up = function (e) {
            document.removeEventListener('mousemove', mv, true);
            document.removeEventListener('mouseup', up, true);
        }
        document.addEventListener('mousemove', mv, true);
        document.addEventListener('mouseup', up, true);
    },
    startResizeLeft: function (win, e) {
        var width = win.getWidth();
        var left = win.getX();
        var x = e.clientX;


        var mv = function(e){
            e = e || window.event;

            if(e.clientX < win.desktop.getX())
                return;


            var diffX = e.clientX - x;

            if(width-diffX <= win.resizeBound)
                return;
            win.setX(left+diffX);
            win.setWidth(width-diffX);
        };
        var up = function (e) {
            document.removeEventListener('mousemove', mv, true);
            document.removeEventListener('mouseup', up, true);
        }
        document.addEventListener('mousemove', mv, true);
        document.addEventListener('mouseup', up, true);
    },
    startResizeRight: function (win, e) {
        var width = win.getWidth();
        var x = e.clientX;

        var mv = function(e){
            e = e || window.event;
            var diffX = e.clientX - x;
            win.setWidth(width+diffX);
        }
        var up = function (e) {
            document.removeEventListener('mousemove', mv, true);
            document.removeEventListener('mouseup', up, true);
        }
        document.addEventListener('mousemove', mv, true);
        document.addEventListener('mouseup', up, true);
    }

}

function Win(element) {

    var self = this;
    element._window = self;

    this.element = element;
    this.desktop = null;

    this.resizeBound = 10;

    this.header = element.querySelector('.window-header')
    this.header.ondblclick = function (e) {
        e = e || window.event;
        e.preventDefault()

        self.toggleMaximalize();
    };
    this.header.onmousedown = function(e) {
        e = e || window.event;
        e.preventDefault();

//                self.element.style.zIndex++; // vyskoc nahoru
        self.sendToTop();

        var x = e.offsetX || e.layerX;
        var y = e.offsetY || e.layerY;

        if(y > self.resizeBound  && x > self.resizeBound && x < self.getWidth() - self.resizeBound)
            windows.startDrag(self, e);

    };


    this.element.onmousemove = function(e) {
        e = e || window.event;

        var x = e.offsetX || e.layerX;
        var y = e.offsetY || e.layerY;

        var top = y < self.resizeBound;
        var bottom = y > self.getHeight() - self.resizeBound;
        var left = x < self.resizeBound;
        var right = x > self.getWidth() - self.resizeBound;

        if(top && left) {
            self.element.style.cursor = 'nw-resize';
        }
        else if(top && right) {
            self.element.style.cursor = 'ne-resize';
        }
        else if(bottom && left) {
            self.element.style.cursor = 'sw-resize';
        }
        else if(bottom && right) {
            self.element.style.cursor = 'se-resize';
        }
        else if(top) {
            self.element.style.cursor = 'n-resize';
        }
        else if(bottom) {
            self.element.style.cursor = 's-resize';
        }
        else if(left) {
            self.element.style.cursor = 'w-resize';
        }
        else if(right) {
            self.element.style.cursor = 'e-resize';
        }
        // non resize
        else {
            self.element.style.cursor = '';
        }
    };
    this.element.onmousedown = function(e) {
        e = e || window.event;
        e.preventDefault();

        self.sendToTop();

        var x = e.offsetX || e.layerX;
        var y = e.offsetY || e.layerY;

        // resize-top
        if(y < self.resizeBound) {
            windows.startResizeTop(self, e);
        }
        // resize-bottom
        if(y > self.getHeight() - self.resizeBound) {
            windows.startResizeBottom(self, e);
        }
        // resize-left
        if(x < self.resizeBound) {
            windows.startResizeLeft(self, e)
        }
        // resize-right
        if(x > self.getWidth() - self.resizeBound) {
            windows.startResizeRight(self, e)
        }

    };
//            document.onmouseup = function(e) {
//                draggable.stopResize(self, e);
//            };


    this.setPosition = function(x, y) {
        this.setX(x);
        this.setY(y);
    };

    this.setX = function(x) {

        if (x < 0)
            x = 0;
        if (x + this.getWidth() > this.desktop.getWidth())
            x = this.desktop.getWidth() - this.getWidth();

        this.element.style.left = x + "px";
    };
    this.setY = function(y) {

        if (y < 0)
            y = 0;
        if (y + this.getHeight() > this.desktop.getHeight())
            y = this.desktop.getHeight() - this.getHeight();

        this.element.style.top = y + "px";
    };
    this.getX = function() {
        return parseInt(this.element.style.left) || element.offsetLeft;
    };
    this.getY = function() {
        return parseInt(this.element.style.top) || element.offsetTop;
    };


    this.getWidth = function() {
        return parseInt(this.element.style.width) || this.element.offsetWidth;
    };
    this.getHeight = function() {
        return parseInt(this.element.style.height) || this.element.offsetHeight;
    };

    this.setWidth = function(width) {
        // min
        if(width < self.resizeBound)
            width = self.resizeBound;
        // max
        if(self.getX()+width > self.desktop.getWidth())
            return;

        this.element.style.width = width + "px";
    };
    this.setHeight = function(height) {
        if(height < self.resizeBound)
            height = self.resizeBound;

        // max
        if(self.getY()+height > self.desktop.getHeight())
            return;

        this.element.style.height = height + "px";
    };


    this.close = function () {
        this.element.remove();
    };
    this.maximalize = function () {
        this.element.classList.add('maximalized');
    };
    this.restore = function () {
        this.element.classList.remove('maximalized');
    };
    this.toggleMaximalize = function() {
        this.element.classList.toggle('maximalized');
    };




    this.attachTo = function(desktop) {
        this.desktop = desktop;
        this.sendToTop();
    };



    this.sendToBack = function() {
        this.element.style.zIndex = 2;
        this.element.classList.remove('active');
    }
    this.sendToTop = function() {
        this.desktop.windows.forEach(function(win) {
            win.sendToBack();
        });
        this.element.style.zIndex = 3;
        this.element.classList.add('active');
    }




}

function Desktop(element) {
    this.element = element;
    this.windows = [];

    this.attachWindow = function(win) {
        this.windows.push(win);
        win.attachTo(this);
    };

    this.getWidth = function() {
        return parseInt(this.element.style.width) || this.element.offsetWidth;
    };
    this.getHeight = function() {
        return parseInt(this.element.style.height) || this.element.offsetHeight;
    };

    this.getX = function() {
        return this.element.offsetLeft;
    };
    this.getY = function() {
        return this.element.offsetTop;
    };

}


var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

document.onreadystatechange = function (e) {

    var desktops = document.querySelectorAll(".desktop");
    forEach(desktops, function (index, el) {
        var desktop = new Desktop(el);

        var windows = el.querySelectorAll(".window");
        forEach(windows, function (index, el) {
            var win = new Win(el);
            desktop.attachWindow(win);
        });
    });

    var closes = document.querySelectorAll("[data-window=close]");
    forEach(closes, function (index, el) {
        el.onclick = function (e) {
            e.preventDefault();

            var target = el.hash || el.dataset.target;

            var element =  document.getElementById(target.substr(1));
            element._window.close();
        }
    });
    var toggleMaximalize = document.querySelectorAll("[data-window=toggle-maximalize]");
    forEach(toggleMaximalize, function (index, el) {
        el.onclick = function (e) {
            e.preventDefault();

            var target = el.hash || el.dataset.target;

            var element =  document.getElementById(target.substr(1));
            element._window.toggleMaximalize();
        }
    });
};