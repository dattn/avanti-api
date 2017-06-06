import yargonaut from 'yargonaut';
import yargs from 'yargs';
import packageInfo from '../../package.json';
import * as Token from '../token';
import setup from 'avanti-core/dist/setup';

setup().then(() => {
    yargonaut
        .style('blue')
        .helpStyle('green')
        .errorsStyle('red.bold');

    var options = yargs
        .version(packageInfo.version)

        .command('token [ip]', 'generate token', {}, async argv => {
            await Token.create(argv.ip)
                .then(token => {
                    console.log(token);
                });
            process.exit();
        })

        .recommendCommands()
        .help()
        .argv;

    if (options._.length === 0) {
        yargs.showHelp();
        process.exit();
    }
});
