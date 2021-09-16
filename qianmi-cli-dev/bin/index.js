#!/usr/bin/env node

const process = require('process')

const yargs = require('yargs');
console.log('xxxx1',yargs.argv)
//dedent 可以百度一下
const dedent = require('dedent')
//用来解析参数的
const { hideBin } = require('yargs/helpers')
const arg = hideBin(process.argv); // qianmi-cli-dev --help  把脚手架命令后面的命令转成参数列表
console.log('参数',arg) //qianmi-cli-dev % qianmi-cli-dev hello --name 12 ---> [ 'hello', '--name', '12' ]
//参数列表传给yargs这个构造函数
/*
    strict() 表示严格模式，当我们输入的参数和配置的参数不匹配，就会提示
    usage()初始化一下信息
    demandCommand(1,'xx') 至少输入一个命令，不输入就会提示xx
    alias('h','help') 给help起个别名 h
    wrap(100) 设置脚手架面板的宽度
    wrap(cli.terminalWidth()) 设计脚手架面板的宽度填充终端
    epilogue('Your own footer description') 在脚手架面板页脚自定义一段话
    dedent(`xx`) 去除缩进，让文本顶行用的
    options() 添加一组选项的，这个选项是对所有command都有效，对所有的command都能访问到
    option()添加一个选项
    group([],'') 对命令进行分组
*/
const cli = yargs(arg)
console.log('cli',cli.argv) // qianmi-cli-dev hello --name 12 ---> { _: [ 'hello' ], name: 12, '$0': 'qianmi-cli-dev' }
    cli
    .usage('qiammi-cli-dev [command] <options>')
    .demandCommand(1,'A command is required. Pass --help to see all available commands and options.')
    .strict()
    
    .alias('h','help')
    .alias('v','version')
    .wrap(cli.terminalWidth())
    .epilogue(dedent`
        When a command fails, all logs are written to lerna-debug.log in the current working directory.

        For more information, find our manual at https://github.com/lerna/lerna
    `)
    .options({
        debug:{
            type:'boolean',
            describe:'Bootstrap debug mode',
            alias:'d'
        }
    })
    .option('registry',{
        // type:'boolean',
        // hidden:true //把这个命令隐藏了
        type:'string',
        describe:'Define global registry',
        alias:'r'
    })
    .fail((err,msg)=>{
        console.log('xxx',err,msg)
    })
    .recommendCommands()
    .group(['debug'],'Dev Options')
    .group(['registry'],'Extra Options')
    .command('init [name]','Do init a project',(yargs)=>{
        yargs
            .option('name',{
                type:'string',
                describe:'Name of a project',
                alias:'n'
            })
    },(yargs)=>{
        console.log(yargs)
    })
    .command({
        command:'list',
        aliases:["ls", "la", "ll"],
        describe: "List local packages",
        builder:(yargs)=>{},
        handler:(yargs)=>{
            console.log(yargs)
        }
    })
    .argv;


