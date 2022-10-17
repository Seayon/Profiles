module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {

    function extracted(proxiesGroupName, searchElement) {
        let proxies = [];
        for (let proxy of content.proxies) {
            if (proxy.server === undefined) continue;
            if (proxy.name.indexOf(searchElement) !== -1) {
                proxies.push(proxy.name);
            }
        }
        if (proxies.length > 0) {
            content['proxy-groups'].push({
                'name': proxiesGroupName,
                'type': 'load-balance',
                'proxies': proxies,
                'url': 'http://cp.cloudflare.com/generate_204',
                'interval': 300,
                'strategy': 'consistent-hashing'
            });
            content['proxy-groups'][0].proxies.unshift(proxiesGroupName);
        }
    }

    console.log('yaml---')
    console.log(yaml)

    notify("MiXin 解析：", url, false);
    const content = yaml.parse(raw)
    // 添加网易云音乐代理

    content.proxies.push({
        'name': 'Netease',
        'type': 'http',
        'server': '168.10.88.136',
        'port': 9991
        // 'skip-cert-verify': true,
        // 'tls': true,
        // 'udp': true
    });

    // 网易云音乐解锁代理
    // content['rules'].unshift("DOMAIN-SUFFIX,163.com,Netease");
    // content['rules'].unshift("PROCESS-NAME,NeteaseMusic,Netease");

    extracted('🇭🇰油尖旺御金·国峯 環球全域電訊', '油尖旺御金·国峯 環球全域電訊');
    extracted('🇭🇰油尖旺御金·国峯 名氣通電訊', '油尖旺御金·国峯 名氣通電訊');
    extracted('🇭🇰印度 班加罗尔 IPLC 负载', '印度 班加罗尔');
    extracted('🇭🇰沪港 IEPL负载', '沪港 IEPL');
    extracted('🇭🇰香港 IPLC负载', '香港 IPLC');
    extracted('🇭🇰香港 IEPL负载', '香港 IEPL');
    extracted('🇭🇰沪日 IEPL负载', '沪日IEPL');
    extracted('🇸🇬新加坡高级 IEPL', '新加坡高级');
    extracted('🇸🇬新加坡高级 IEPL', '台湾IEPL');
    extracted('🇯🇵中国-日本 多协议标签交换虚拟专用网', '中国-日本 多协议标签交换虚拟专用网');
    // extracted('Netease', 'Netease');


    // 导入神机规则

    // 导入 Global 全球常用域名的规则
    let ruleProviders = {}
    ruleProviders['Global'] = {
        'type': "file",
        'behavior': "classical",
        'path': "/Users/seayon/IdeaProjects/Profiles/Clash/RuleSet/Global.yaml",
        'url': 'https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/Global.yaml',
        'interval': "86400"
    }
    content['rule-providers'] = ruleProviders
    // 将上述的 Global 设置为使用代理
    content['rules'].unshift("RULE-SET,Global,🔰国外流量");



    // // 导入 Unbreak 列表
    // content['rules'].unshift("RULE-SET,Global,🔰国外流量");

    // 导入自定义的域名列表
    content['rules'].unshift("DOMAIN-SUFFIX,duyaoss.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,stackoverflow.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,jenkins-ci.org,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,jenkins.io,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,debian.org,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,docker.io,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,v2ex.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,ftp-chi.osuosl.org,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,production.cloudflare.docker.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,spring.io,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,mysql.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,deepl.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,postman.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,getpostman.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,postmanlabs.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,*.doubleclick.net,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,cdn.mouseflow.com,🔰国外流量");
    content['rules'].unshift("DOMAIN-SUFFIX,translate.googleapis.com,🔰国外流量");

    content['rules'].unshift("DOMAIN-SUFFIX,cloudfront.net,DIRECT");

    // 导入医保内网要放开的网段
    // content['rules'].unshift("IP-CIDR,172.15.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.151.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.10.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.20.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.100.0.0/16,DIRECT");


    return yaml.stringify(content)
}
