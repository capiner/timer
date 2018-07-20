/*!
 * Timer 1.0.0
 *
 * Copyright © Capiner https://capiner.com
 * MIT License https://github.com/capiner/timer/blob/master/LICENSE
 */
(function($){
	$.Timer = function(element, options){
		this.e = $(element);
		this.o = $.extend(true, {}, $.Timer.defaults, options);
		this.count()
	};
	$.Timer.prototype = {
		count: function(){
			var self   = this,
				step   = Math.ceil(self.o.step),
				start  = new Date(self.o.startTime),
				end    = new Date(self.o.endTime),
				diff   = new Date(end - start),
				secs   = Math.floor(diff.valueOf() / 1000),
				out    = (Math.abs(step) - 1) * 1000 + 990,
				active = true,
				format, display;
			if (step >= 0) active = false;
			count(secs, self.e.attr('id'));
			function day(secs, num1, num2){
				return ((Math.floor(secs / num1) % num2)).toString()
			}
			function time(secs, num1, num2){
				num = day(secs, num1, num2);
				if (num.length < 2) num = '0' + num;
				return num
			}			
			function count(secs, id){
				if (format = self.o.daysFormat){
					if (self.o.dayFormat && day(secs, 86400, 100000) < 2) format = self.o.dayFormat
				} else {
					format = self.o.dayFormat
				}
				display = format.replace(/DD/g, day(secs, 86400, 100000)),
				display = display.replace(/HH/g, time(secs, 3600, 24)),
				display = display.replace(/MM/g, time(secs, 60, 60)),
				display = display.replace(/SS/g, time(secs, 1, 60)),
				document.getElementById(id).innerHTML = display;
				if (active){
					setTimeout(function(){
						count((secs + step), id)
					}, out)
				}
				if (secs < 0){
					return document.getElementById(id).innerHTML = self.o.finishMessage;
				}
			}
		}
	};
	$.fn.Timer = function(options){
		if (typeof options === 'string'){
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function(){
				var Timer = $.data(this, 'Timer');
				Timer[options].apply(Timer, args)
			})
		} else {
			this.each(function(){
				var Timer = $.data(this, 'Timer');
				if (!Timer) $.data(this, 'Timer', new $.Timer(this, options))
			})
		}
		return this
	};
	$.Timer.defaults = {
		step          : '-1',
		startTime     : null,
		endTime       : null,
		dayFormat     : 'DD day HH:MM:SS',
		daysFormat    : 'DD days HH:MM:SS',
		finishMessage : null
    }
})(jQuery)