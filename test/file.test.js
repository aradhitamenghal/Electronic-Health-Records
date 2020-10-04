const file = artifacts.require("file");

require('chai')
  .use(require('chai-as-promised'))
  .should()


  contract('file', (accounts)=>{

    let filevar
    before(async ()=>{
      filevar= await file.deployed()
    })
    describe('deployment', async ()=>{
      it('deploys successfully',async () =>{
        filevar= await file.deployed()
        const address= filevar.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })
      //const address='0x5D35750258D15f6e02Cb0497053D79f397b396f2'
    })

    describe('storage0', async () =>{
     it(' updates the file hash', async()=>{
       let filehash
       filehash='abc123'
       await filevar.set(filehash)
       const result =await filevar.get()
       assert.equal(result, filehash)
     })
    })
  })
