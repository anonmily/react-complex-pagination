import is from 'simply-is'

export function args_to_array(args){
	if( is.argument(args) ){
		let arr = []
		for(var i=0; i < args.length; i++){
			arr.push(args[i])	
		}
		return arr
	}else{
		return args
	}
}

export function refresh_page(){
	window.location.reload(true)
}

export function ups_ship_time_format(date){
   date = String(date)
   let hour = date.substring(0,2)
   let min = date.substring(2,4)
   let sec = date.substring(4)

   var period = "AM"
   if( hour > 12 ){
	hour = Number(hour) - 12
	period = "PM"
   }

   return `${hour}:${min} ${period}`
}

export function preload_image(src){
	async( function preload(){
		let a = new Image()
		a.src = src
	})
}

// Device Check
export function is_device_mobile(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 return true;
	}
}

// Async
export function async(fn){
	setTimeout(fn, 0)
}


// Object stuff
export function bind_methods_to_self(obj){
	let properties = Object.getOwnPropertyNames(obj)
	properties.forEach( property => {
		if( is.function(obj[property]) ){
			obj[property] = obj[property].bind(obj)
		}
	})
}

// Arrays
export function max(arr){
	if( is.not.array(arr) ){
		throw new TypeError('max: invalid parameter passed. arr=' + arr + ' array? ' + is.array(arr) )
	}
	if( arr.length === 0 ){
		throw new RangeError('max: array is empty')
	}
	return Math.max.apply(null, arr)
}
export function min(arr){
	if( is.not.array(arr) ){
		throw new TypeError('min: invalid parameter passed. arr=' + arr)
	}
	if( arr.length === 0 ){
		throw new RangeError('min: array is empty arr=' + arr)
	}
	return Math.min.apply(null, arr)
}

export function adjacent(arr1, arr2){
	return (max(arr1) + 1) === min(arr2)
}

export function sort_ascending(a,b){
	return a - b
}
export function sort_descending(a,b){
	return b - a
}
export function sort(arr, type="asc"){
	let first_item = arr[0]
	if( is.number(arr[0]) ){
		switch(type){
			case "asc":
				return arr.sort( sort_ascending )
			case "desc":
				return arr.sort( sort_descending )
			default:
				return arr.sort( sort_ascending )
		}
	}else{
		return arr.sort()
	}
}

export function to_milliseconds(num, measure){
	measure = plural( upper(measure) )
	if( is.not.number(num) ){
		throw new TypeError('to_milliseconds needs a numerical value to convert')
	}
	switch(measure){
		case 'MINUTES':
			return num*60*1000
		case 'SECONDS':
			return num*1000
		case 'HOURS':
			return num*60*60*1000
		default:
			return num*1000
	}
}

export function currency(amount) {
	return amount.toFixed(2)
}

// Cookies
export function set_cookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; expires=" + expires + '; path=/;';
	//console.log(document.cookie)
}

export function get_cookie(cname) {
	let name = cname + "=";
	let cookies = document.cookie.split(';');
	for(let i=0; i<cookies.length; i++) {
		let c = cookies[i];
		while (c.charAt(0) === ' ') c = c.substring(1);
		if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
	}
	return "";
}

export function delete_cookie(cname) {
	set_cookie(cname, "", -100);
}

// Numbers
export let invalid_number = function(num) {
	return is.nan(num) || is.infinite(num) || is.not.a.number(num)
}

export let valid_number = function(num){
	return !invalid_number(num)
}

// Strings
export function upper(str) {
	return str ? String(str).toUpperCase() : ""
}

export function lower(str) {
	return str ? String(str).toLowerCase() : ""
}

export function is_upper(str) {
	return String(str) === upper(str)
}

export function is_lower(str) {
	return String(str) === upper(str)
}

export function same_case(ref, str) {
	if( is_upper(ref) ){
		return upper(str)
	}else{
		return lower(str)
	}
}

export function plural(str) {
	str = String(str)
	let last_letter = str[str.length-1]
	let is_singular = upper(last_letter) !== 'S'
	if( is_singular ){
		return str + same_case(last_letter, 'S')
	}else{
		return str
	}
}

export function escape_reg_exp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function css_class(str) {
	return String(str).toLowerCase().trim().replace(/[ _]/g,'-').replace(/#/g,'');
}

// Notifications
export function notify(title, message) {
	if('Notification' in window){
		let Notification = window.Notification
		if (Notification.permission === 'granted') {
			send_notification(title, message);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function(permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
				   send_notification(title, message);
				}
			});
		} 
	}
}

export function send_notification(title, msg){
	if ('Notification' in window) {
		let Notification = window.Notification
		var notification = new Notification(title, {
			body: msg
		});
		setTimeout(notification.close.bind(Notification), 4000);
	}
}

