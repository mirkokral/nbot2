const cprocess = require('child_process');
let servCProcesses = {};
servCProcesses['ayunboom'] = cprocess.fork('./index.js', {
  env: {
    host: 'sus.shhnowisnottheti.me',
    port: '25565',
    name: 'ayunboom',

    token:
      'MTAwMjI3MzA2NDM2NjY0NTI3OA.GgWfQR.swC-gpdc-mEw20-oZa9KphKZKTEphacOAc7clQ',
  },
});
servCProcesses['ayunboom'].on('exit', (code) => {
  console.log(code);
});
