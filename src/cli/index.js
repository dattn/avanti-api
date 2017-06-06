import yargonaut from 'yargonaut';
import yargs from 'yargs';
import packageInfo from '../../package.json';
import * as Token from '../token';
import chalk from 'chalk';
import setup from 'avanti-core/dist/setup';

const handleError = err => {
    process.exitCode = 1;
    process.stderr.write(chalk.red(chalk.bold('ERROR:') + ' ' + err) + '\n');
    process.exit();
};

const handleCommand = (handler, yargs) => {
    return async argv => {
        try {
            await handler.handle(argv, yargs);
        } catch(err) {
            handleError(err);
        }
        process.exit();
    };
};

try {

    setup().then(() => {
        yargonaut
            .style('blue')
            .helpStyle('green')
            .errorsStyle('red.bold');

        var options = yargs
            .version(packageInfo.version)

            .command('token [ip]', 'generate token', {}, async argv => {
                try {
                    await Token.create(argv.ip)
                        .then(token => {
                            console.log(token);
                        });
                } catch(err) {
                    handleError(err);
                }
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

} catch(err) {
    handleError(err);
}
