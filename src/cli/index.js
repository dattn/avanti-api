import yargonaut from 'yargonaut';
import yargs from 'yargs';
import packageInfo from '../../package.json';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

yargonaut
    .style('blue')
    .helpStyle('green')
    .errorsStyle('red.bold');

var options = yargs
    .version(packageInfo.version)

    .command('token [name]', 'generate token', {}, argv => {
        jwt.sign({
            name: argv.name,
            uuid: uuid()
        }, 'SECRET', {}, (err, token) => {
            console.log(token);
        });
    })

    .recommendCommands()
    .help()
    .argv;

if (options._.length === 0) {
    yargs.showHelp();
    process.exit();
}
