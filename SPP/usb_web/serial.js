
class SerialController {
	//var port = null;
	async init(read_cb) {
		if ('serial' in navigator) {
			try {
				this.port = await navigator.serial.requestPort();
				console.log('USB-COM open.');
				await this.port.open({baudRate: 115200, baudrate: 115200});
				this.writer = this.port.writable.getWriter();
		        this.reader = this.port.readable.getReader();
				//console.log('DTR on, RTS off.');
				//await this.port.setSignals({dataTerminalReady: false, requestToSend: true});
				//await delay(10);
				//console.log('RTS on.');
				//await this.port.setSignals({requestToSend: false});
				//console.log('DTR off, RTS off.');
				//await this.port.setSignals({dataTerminalReady: false, requestToSend: false});
				//await delay(10);
				//if (typeof init_cb == 'function') init_cb(this.port);
				this.read_cb = read_cb;
				this.read_raw_all();
				infoline("USB-COM is open.");
			}
			catch (err) {
				console.error('There was an error opening the serial port:', err);
				errline('Open COM: '+err);
				this.port = null;
				return false;
			}
		}
		else {
			console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:');
			console.error('chrome://flags/#enable-experimental-web-platform-features');
			console.error('opera://flags/#enable-experimental-web-platform-features');
			console.error('edge://flags/#enable-experimental-web-platform-features');
			alert('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:\r\nchrome://flags/#enable-experimental-web-platform-features\r\nopera://flags/#enable-experimental-web-platform-features\r\nedge://flags/#enable-experimental-web-platform-features');
			this.port = null;
			return false;
		}
		return true;
	}
	async write_raw(data) {
		if(this.port != null)
			return await this.writer.write(data);
		return;
	}
	async read_raw_all() {
		try {
	        // this.reader = this.port.readable.getReader();
			while (true) {
				const { value, done } = await this.reader.read();
				if (done) {
					console.log('COM reader has been canceled.');
			        break;
				}
				// Do something with |value|...
				//console.log('vv:', value);
				if (typeof this.read_cb == 'function') this.read_cb(value);
			}
		}
		catch (err) {
			console.error('Error reading data:', err);
			errline(err);
			this.port = null;
		}
	}
	async close() {
		await this.writer.close();
		await this.reader.cancel();
		await this.port.close();
		this.port = null;
		infoline('USB-COM is closed.');
	}
}
