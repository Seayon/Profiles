module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {

    function extracted(proxiesGroupName, searchRegex) {
        let proxies = [];
        for (let proxy of content.proxies) {
            if (proxy.server === undefined) continue;
            if (proxy.name.match(searchRegex) !== null) {
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

    extracted('香港|MPTCP', '香港\\d{2}\\|MPTCP');
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
    content['rules'].unshift("RULE-SET,Global,🐸速蛙云");



    // // 导入 Unbreak 列表
    // content['rules'].unshift("RULE-SET,Global,🐸速蛙云");

    // 导入自定义的域名列表
    content['rules'].unshift("DOMAIN-SUFFIX,duyaoss.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,stackoverflow.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,jenkins-ci.org,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,jenkins.io,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,debian.org,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,docker.io,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,v2ex.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,ftp-chi.osuosl.org,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,production.cloudflare.docker.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,spring.io,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,mysql.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,deepl.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,postman.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,getpostman.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,postmanlabs.com,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,*.doubleclick.net,🐸速蛙云");
    content['rules'].unshift("DOMAIN-SUFFIX,cdn.mouseflow.com,🐸速蛙云");

    content['rules'].unshift("DOMAIN-SUFFIX,cloudfront.net,DIRECT");

    // 导入医保内网要放开的网段
    // content['rules'].unshift("IP-CIDR,172.15.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.151.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.10.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.20.0.0/16,DIRECT");
    // content['rules'].unshift("IP-CIDR,168.100.0.0/16,DIRECT");


    return yaml.stringify(content)
}
