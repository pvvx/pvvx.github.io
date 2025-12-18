
const INA_I2C_ADDR = 0x80;

const INAxxx_MID = 0x5449;
const NO_I2C_DID = 0x0000;
const INA219_DID = 0x0001;
const INA226_DID = 0x2260; // = INA231
const INA228_DID = 0x2281;
const INA3221_DID = 0x3220;

// INA226/231 settings:
const INA226_MTID = 3;	//Measure time interval (idx):   0,   1,   2,   3,   4,    5,    6,     7 
const INA226_MAID = 0;  // Average (idx): 0 = 1, 1 = 4, 2 = 16, 3 = 64, 4 = 128, 5 = 256, 6 = 512, 7 = 1024
const INA226_MTIU = 588; //Measure time interval (us):  140, 204, 332, 588, 1100, 2116, 4.156, 8244
const INA226rShunt = 0.1; // Shunt 0.1 Om
const INA226kShunt = 0.023985; // Shunt 0.1 Om: 0.025   0.025*372/300=0.031
const INA226zShunt = 0.0078; 
const INA226kBus = 1.25;
const INA226zBus = 0; //-0.00365901;
// INA228 settings:
const INA228_MTID = 3;		//Measure time interval (idx): 1,  2,   3,   4,   5,    6,    7
const INA228_MTIU = 280;    //Measure time interval (us): 84, 150, 280, 540, 1052, 2074, 4120 us
const INA228rShunt = 10.0; // Shunt 10.0 Om
const INA228kShunt = 0.0000019613524; // Shunt 10.0 Om: 0.000001953125  // max R 100MOm
const INA228zShunt = 0.000004;
const INA228kBus = 0.01220703125; // 0.01220703125
const INA228zBus = 0;
// INA3221 settings:
const INA3221_MTID = 1;	//Measure time interval (idx):   0,   1,   2,   3,   4,    5,    6,     7 
const INA3221_MTIU = 140; //Measure time interval (us): 140, 204, 332, 588, 1100, 2116, 4.156, 8244
const INA3221_MAID = 2; // Average (idx): 0 = 1, 1 = 4, 2 = 16, 3 = 64, 4 = 128, 5 = 256, 6 = 512, 7 = 1024
const INA3221rShunt1 = 0.01; // Shunt 0.01 Om
const INA3221kShunt1 = 0.04814995; // Shunt 0.01 Om  0.05*989/1027=0.04814995  // max R 1kOm
const INA3221zShunt1 = 0;
const INA3221rShunt2 = 0.01; // Shunt 0.01 Om
const INA3221kShunt2 = 0.048903165; // Shunt 0.01 Om  0.05
const INA3221zShunt2 = 0;
const INA3221rShunt3 = 0.01; // Shunt 0.01 Om
const INA3221kShunt3 = 0.05; // Shunt 0.01 Om  0.05
const INA3221zShunt3 = 0;
const INA3221kBus1 = 1.0;
const INA3221zBus1 = 0;
const INA3221kBus2 = 1.0; //0035; 
const INA3221zBus2 = 0;
const INA3221kBus3 = 1.0;
const INA3221zBus3 = 0;


var config_ina226 = {
	name: "INA226",
	pktcnt: 30,
	multiplier: 0,
	time_us: INA226_MTIU,
	clk_khz: 1200,
	init: [ [INA_I2C_ADDR, 0x0, 0x8000], 
		[INA_I2C_ADDR, 0x0, 0x0007 | (INA226_MTID<<3)|(INA226_MTID<<6)|(INA226_MAID<<9)], 
		[INA_I2C_ADDR, 0x0, 0x0007 | (INA226_MTID<<3)|(INA226_MTID<<6)|(INA226_MAID<<9)], 
		[0, 0, 0] ],
	rd: [ [INA_I2C_ADDR, 0x02], [INA_I2C_ADDR, 0x01], 
		[INA_I2C_ADDR, 0x02], [INA_I2C_ADDR, 0x01]],
	slp: [ [INA_I2C_ADDR, 0x0, 0x0], [0, 0, 0] ],
	rShunt: INA226rShunt, // Shunt 10.0 Om
	kShunt: INA226kShunt, // Shunt 10.0 Om: 0.000001953125
	zShunt: INA226zShunt,
	kBus: INA226kBus,
	zBus: INA226zBus,
	mode: 0,
	chnls: 2,

	t_us: 588, sps: 1700.7
}

var config_ina228 = {
	name: "INA228",
	pktcnt: 20,
	multiplier: 0,
	time_us: INA228_MTIU,
	clk_khz: 1300,
	init: [ [INA_I2C_ADDR, 0x0, 0xC000], // System Reset sets registers to default values
			[INA_I2C_ADDR, 0x0b, 0x4000], // Alert pin to be asserted when the Conversion Ready
			[INA_I2C_ADDR, 0x0, 0x0 ],  // Shunt full scale range +-163.84 mV 
			[INA_I2C_ADDR, 0x01, 0xB000 | (INA228_MTID<<3)|(INA228_MTID<<6)|(INA228_MTID<<9)] ], // Continuous Shunt + Vbus, 540 us : 1851 sps,  
	rd: [ [INA_I2C_ADDR, 0x05], [INA_I2C_ADDR, 0x04], [0, 0], [0, 0] ],
	slp: [ [INA_I2C_ADDR, 0x01, 0x0], [0, 0, 0] ],
	rShunt: INA228rShunt,
	kShunt: INA228kShunt, // Shunt 10.0 Om: 0.000001953125
	zShunt: INA228zShunt,
	kBus: INA228kBus,
	zBus: INA228zBus,
	mode: 2,
	chnls: 2,

	t_us: INA228_MTIU, sps: 1000000/INA228_MTIU
}

var config_ina3221 = {
	name: "INA3221",
	pktcnt: 28,
	multiplier: 0,
	time_us: INA3221_MTIU,
	clk_khz: 1200,
	init: [ [INA_I2C_ADDR, 0x0, 0xC007], 
		[INA_I2C_ADDR, 0x0, 0x6007 | (INA3221_MTID<<3)|(INA3221_MTID<<6)|(INA3221_MAID<<9)], // Continuous Shunt + Vbus, INA3221_MTID 
		[INA_I2C_ADDR, 0x0, 0x6007 | (INA3221_MTID<<3)|(INA3221_MTID<<6)|(INA3221_MAID<<9)], // Continuous Shunt + Vbus, INA3221_MTID 
		[INA_I2C_ADDR, 0x0, 0x6007 | (INA3221_MTID<<3)|(INA3221_MTID<<6)|(INA3221_MAID<<9)]], // Continuous Shunt + Vbus, INA3221_MTID 
	rd: [ [INA_I2C_ADDR, 0x02], [INA_I2C_ADDR, 0x01], 
		[INA_I2C_ADDR, 0x04], [INA_I2C_ADDR, 0x03]],
	slp: [ [INA_I2C_ADDR, 0x0, 0x0], [0, 0, 0] ],
	rShunt1: INA3221rShunt1, // Shunt 0.01 Om
	kShunt1: INA3221kShunt1, // Shunt 0.01 Om: 0.05
	zShunt1: INA3221zShunt1,
	rShunt2: INA3221rShunt2, // Shunt 0.01 Om
	kShunt2: INA3221kShunt2, // Shunt 0.01 Om: 0.05
	zShunt2: INA3221zShunt2,
	rShunt3: INA3221rShunt3, // Shunt 0.01 Om
	kShunt3: INA3221kShunt3, // Shunt 0.01 Om: 0.05
	zShunt3: INA3221zShunt3,
	kBus1: INA3221kBus1,
	zBus1: INA3221zBus1,
	kBus2: INA3221kBus2,
	zBus2: INA3221zBus2,
	kBus3: INA3221kBus3,
	zBus3: INA3221zBus3,

	mode: 0,
	chnls: 4,

	t_us: INA3221_MTIU, sps: 1000000/INA3221_MTIU
}


function delay(ms) {
  return new Promise((resolve, reject) => {
	setTimeout(resolve, ms);
  });
}

function hex(number, length) {
	var str = (number.toString(16)).toUpperCase();
	while (str.length < length) str = '0' + str;
	return str;
}

function bytesToHex(data) {
	return new Uint8Array(data).reduce(function(memo, i) {
		return memo + ("0" + i.toString(16)).slice(-2);
	}, "");
}

function concatTypedArrays(a, b) { // a, b TypedArray of same type
		let c = new (b.constructor)(a.length + b.length);
    	c.set(a, 0);
    	c.set(b, a.length);
    	return c;
}

class  PPdev {
	dev = { 
		open: false,
		dev_id: 0,
		ver_id: 0,
		ina_did: NO_I2C_DID,
		ina_mid: NO_I2C_DID,
		adc_wrk: false
	};
	blk = null;
	cport = null;
	start_cb = null;
	stop_cb = null;
	open_cb = null;
	close_cb = null;
	new_adc_cb = null;
	rx_cmd = null;
	cfg = config_ina3221;
/*
	constructor() {
		this.dev = { 
			open: false,
			dev_id: 0,
			ver_id: 0,
			ina_id: 0,
			adc_wrk: false
		};
		this.blk = new Uint8Array();
		this.cport = null;
		this.start_cb = null;
		this.stop_cb = null;
		this.open_cb = null;
		this.close_cb = null;
		this.new_adc_cb = null;

		//this.dev.adc_wrk = false;
		//this.cport = new SerialController;
		//this.cport.init(init_cb);
	}
*/
	async SendCMD(cmd, send_cb = null) {
		this.rx_cmd = null;
		this.tx_cmd = cmd[1];
		this.rx_cmd_ok = false;
		await this.cport.write_raw(cmd);
		let i = 50;
		while(i--) {
			await delay(2);
			if (this.rx_cmd_ok == true) {
				if (typeof send_cb == 'function')
					send_cb(); 
				return;
			}
		}
		//console.log('Command '+hex(this.tx_cmd,2)+' timeout!');
		errline('Command response timeout #'+hex(this.tx_cmd,2)+'!');
	}
	async SendConfig(cfg = config_ina226) {
		let blk = new Uint8Array(40);
		blk[0] = 38; // size
		blk[1] = 1; // cmd
		blk[2] = cfg.pktcnt;
		blk[3] = cfg.multiplier;   
		blk[4] = cfg.time_us & 0xff;
		blk[5] = (cfg.time_us >> 8) & 0xff;
		blk[6] = cfg.clk_khz & 0xff;
		blk[7] = (cfg.clk_khz >> 8) & 0xff;
		blk[8] = cfg.init[0][0]; // i2c_addr
		blk[9] = cfg.init[0][1];
		blk[10] = cfg.init[0][2] & 0xff;
		blk[11] = (cfg.init[0][2] >> 8) & 0xff;
		blk[12] = cfg.init[1][0];
		blk[13] = cfg.init[1][1];
		blk[14] = cfg.init[1][2] & 0xff;
		blk[15] = (cfg.init[0][2] >> 8) & 0xff;
		blk[16] = cfg.init[2][0];
		blk[17] = cfg.init[2][1];
		blk[18] = cfg.init[2][2] & 0xff;
		blk[19] = (cfg.init[2][2] >> 8) & 0xff;
		blk[20] = cfg.init[3][0];
		blk[21] = cfg.init[3][1];
		blk[22] = cfg.init[3][2] & 0xff;
		blk[23] = (cfg.init[3][2] >> 8) & 0xff;
		blk[24] = cfg.rd[0][0];
		blk[25] = cfg.rd[0][1];
		blk[26] = cfg.rd[1][0];
		blk[27] = cfg.rd[1][1];
		blk[28] = cfg.rd[2][0];
		blk[29] = cfg.rd[2][1];
		blk[30] = cfg.rd[3][0];
		blk[31] = cfg.rd[3][1];
		blk[32] = cfg.slp[0][0];
		blk[33] = cfg.slp[0][1];
		blk[34] = cfg.slp[0][2] & 0xff;       
		blk[35] = (cfg.slp[0][2] >> 8) & 0xff;
		blk[36] = cfg.slp[1][0];
		blk[37] = cfg.slp[1][1];
		blk[38] = cfg.slp[1][2] & 0xff;
		blk[39] = (cfg.slp[1][2] >> 8) & 0xff;
		await this.SendCMD(blk);
	}
	async Stop() {
		console.log('Send command #08: StopADC...');
		await this.cport.write_raw(new Uint8Array([1, 8, 0])); // [1, 1, 0] // Stop ADC
		await delay(5);
		console.log('Send command #01: StopI2C...');
		await this.cport.write_raw(new Uint8Array([1, 1, 0])); // [1, 1, 0] // Stop I2C
		await delay(5);
	}
	async Close() {
		await this.Stop();
		this.cport.close(); 
		if(this.dev.adc_wrk == true) {
			this.dev.adc_wrk = false;
			if (typeof this.stop_cb == 'function') 
				this.stop_cb();
		}
		this.dev.open = false;
		if (typeof this.close_cb == 'function')
			this.close_cb();
	}
	CmdDecode(value) {
		if(value instanceof Uint8Array) {
			this.blk = concatTypedArrays(this.blk, value);
			while(this.blk.length > 1) {
				let blksz = this.blk[0];
				if (this.blk.length < blksz + 2) return;

				let blkid = this.blk[1];
				this.rx_cmd = blkid&0x7f;
				if (this.rx_cmd == this.tx_cmd)
					this.rx_cmd_ok = true;
				//console.log('Device Response: '+ bytesToHex(this.blk.slice(0,blksz+2)));
				if ((blkid & 0x80)!=0) {
					console.log('Response cmd:'+hex(this.rx_cmd, 2)+' error! Blk: ' + bytesToHex(this.blk.slice(0,blksz+2)));
				} else if (blkid == 0x07) { // i2c data
					if (typeof this.new_adc_cb == 'function') {
						if(this.cfg.chnls == 4) {
							for (var i=0; i<blksz; i+=8) {
								var d1u = this.blk[i+2] | (this.blk[i+3]<<8);
								var d1i = this.blk[i+4] | (this.blk[i+5]<<8);
								if(d1i >= 0x8000)
									d1i -= 0x10000;
								d1i -= (d1u/300) & 0xff8; // INA3221
								var d2u = this.blk[i+6] | (this.blk[i+7]<<8);
								var d2i = this.blk[i+8] | (this.blk[i+9]<<8);
								if(d2i >= 0x8000)
									d2i -= 0x10000;
								d2i -= (d2u/300) & 0xff8;
								this.new_adc_cb(d1u, d1i, d2u, d2i);
							}
						} else if(this.cfg.chnls == 2) {
							for (var i=0; i<blksz; i+=4) {
								var du = this.blk[i+2] | (this.blk[i+3]<<8);
								var di = this.blk[i+4] | (this.blk[i+5]<<8);
								if(di >= 0x8000)
									di -= 0x10000;
								//if(du > 2550) di -= 1;// INA226/231 3190mV/1.25mV=2552 
								this.new_adc_cb(du, di);
							}
						} else {
							for (var i=0; i<blksz; i+=2) {
								this.new_adc_cb(this.blk[i+2] | (this.blk[i+3]<<8));
							}
						}
					}
				} else if (blkid == 0x3A) { // i2c 24bit  data
					if (typeof this.new_adc_cb == 'function') {
						if(this.cfg.chnls == 2) {
							for (var i=0; i<blksz; i+=6) {
								let du = this.blk[i+2] | (this.blk[i+3]<<8) | (this.blk[i+4]<<16);
								let di = this.blk[i+5] | (this.blk[i+6]<<8) | (this.blk[i+7]<<16);
								if(di >= 0x800000)
									di -= 0x1000000;
								this.new_adc_cb(du, di);
							}
						} else {
							for (var i=0; i<blksz; i+=3) {
								this.new_adc_cb(this.blk[i+2] | (this.blk[i+3]<<8) | (this.blk[i+4]<<16));
							}
						}
					}
				} else 	if (blkid == 0x0A) { // adc data
					if (typeof this.new_adc_cb == 'function') {
						for (var i=0; i<blksz; i+=2) {
							this.new_adc_cb([this.blk[i+2] | (this.blk[i+3]<<8)]);
						}
					}
				} else if(this.rx_cmd == 0x00 && blksz >= 4) { // response to the command getver
					this.dev.dev_id = this.blk[2] | (this.blk[3]<<8);
					this.dev.ver_id = this.blk[4] | (this.blk[5]<<8);
					let str = 'DeviceID: '+ hex(this.dev.dev_id, 4)+', Ver: '+hex(this.dev.ver_id, 4);
			    	//console.log(str);
					infoline(str);
					if((this.dev.dev_id & 0xff) != 0x24) {
						errline('DevOpen: Unknown USB-BLE Device!');
					}
				} else if(this.rx_cmd == 0x01 && blksz >= 38) { // response to the command stop i2c 0x01 -> i2c config
					if(this.blk[2] != 0) {
						console.log('Start I2C - Ok.');
						if(this.dev.adc_wrk == false) {
							this.dev.adc_wrk = true;
							if (typeof this.start_cb == 'function')
								this.start_cb();
						}
					} else {
					    console.log('Stop I2C - Ok.');
						if(this.dev.adc_wrk == true) {
							this.dev.adc_wrk = false;
							if (typeof this.stop_cb == 'function') 
								this.stop_cb();
						};
					}
				} else if(this.rx_cmd == 0x08) { // response to the command Start ADC 0x08 -> ADC config
					if(this.blk[2] != 0) {
					    console.log('Start ADC - Ok.');
						if(this.dev.adc_wrk == false) {
							this.dev.adc_wrk = true;
							if (typeof this.start_cb == 'function')
								this.start_cb();
						}
					} else {
					    console.log('Stop ADC - Ok.');
						if(this.dev.adc_wrk == true) {
							this.dev.adc_wrk = false;
							if (typeof this.stop_cb == 'function') 
								this.stop_cb();
						};
					}
				} else if(this.rx_cmd == 0x10 && blksz >= 4) {
					console.log('Read I2C addr: 0x'+hex(this.blk[2],2)+', Register: 0x'+hex(this.blk[3],2)+', Data: '+ bytesToHex(this.blk.slice(4, blksz+2)));
					if(this.blk[3] == 0xfe) {
						this.dev.ina_mid = this.blk[4] | (this.blk[5]<<8);
						console.log('INAxxx MID: 0x' + hex(this.dev.ina_mid, 4));
					}
					else if(this.dev.ina_mid == INAxxx_MID && this.blk[3] == 0xff) {
						this.dev.ina_did = this.blk[4] | (this.blk[5]<<8);
						console.log('INAxxx DID: 0x' + hex(this.dev.ina_did, 4));
					}
				} else if(this.rx_cmd == 0x18 && blksz >= 1) {
					if(this.blk[2] != 0)
					    console.log('Set ADC data 24 bits.');
					else
					    console.log('Set ADC data 16 bits.');

				} else 
					console.log('Response ? blk: ' + bytesToHex(this.blk.slice(0,blksz+2)));
				this.blk = this.blk.slice(blksz+2);
			}
		} else console.log('Device data?', value);
	};
	async Open(rd_cb) {
		this.blk = new Uint8Array(); // flush RX
		this.cport = new SerialController();
		var r = await this.cport.init(rd_cb);
		if(r != true) return r;
		await this.Stop();
		console.log('Send command #00: GetVersion...');
		await this.SendCMD(new Uint8Array([0, 0])); // [0, 0] // GetVersion
		console.log('Send command #10: Read I2C addr 0x80, Register 0xfe...');
		await this.SendCMD(new Uint8Array([2, 0x10, INA_I2C_ADDR, 0xfe]));
		if(this.dev.ina_mid == INAxxx_MID) {
			console.log('Send command #10: Read I2C addr 0x80, Register 0xff...');
			this.SendCMD(new Uint8Array([2, 0x10, INA_I2C_ADDR, 0xff])); 
		}
		this.dev.open = true;
		if (typeof this.open_cb == 'function')
			await this.open_cb();
		await delay(10);
		if(this.dev.ina_did == INA3221_DID) {
			this.cfg = config_ina3221;
		} else if (this.dev.ina_did == INA226_DID) {
			this.cfg = config_ina226;
		} else if (this.dev.ina_did == INA228_DID) {
			this.cfg = config_ina228;
		} else {
			await this.Close(); 
			errline('Not connect INAxxx!');
			return;
		}
		console.log(this.cfg.name + ' connected.');
		this.cfg.t_us = this.cfg.time_us << (this.cfg.multiplier + 1);
		if(this.cfg.t_us > 0) {
			this.cfg.sps = (2000000.0/this.cfg.chnls)/this.cfg.t_us;
		} else {
			errline('DevOpen: Error config!');
		}	
		await this.SendCMD(new Uint8Array([1, 0x18, this.cfg.mode]));
		await this.SendConfig(this.cfg);
		await delay(3000);
		if(!this.dev.adc_wrk) {
			await this.Close(); 
			errline('DevOpen: Not Start PPDevice!');
			r = false;
		}
		return r;
		// else if (typeof this.start_cb == 'function') 
//			this.start_cb();
	}
}