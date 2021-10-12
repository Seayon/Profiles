module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {

    console.log('yaml---')
    console.log(yaml)

    notify("MiXin 解析：", url, false);
    const content = yaml.parse(raw)
    // console.log(obj)

    let proxies = [];
    for (let proxy of content.proxies) {
        if (proxy.server === undefined) continue;
        if (proxy.name.indexOf('香港') !== -1) {
            proxies.push(proxy.name);
        }
    }
    if (proxies.length > 0) {
        content['proxy-groups'].push({
            'name': '🇭🇰香港负载均衡',
            'type': 'load-balance',
            'proxies': proxies,
            'url': 'http://cp.cloudflare.com/generate_204',
            'interval': 300,
            'strategy': 'consistent-hashing'
        });
        content['proxy-groups'][0].proxies.unshift("🇭🇰香港负载均衡");
    }

    // 导入神机规则

    // 导入 Global 全球常用域名的规则
    let ruleProviders = {}
    ruleProviders['Global'] = {
            'type': "http",
            'behavior': "classical",
            'path': "./Global.yaml",
            'url': 'https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/Global.yaml',
            'interval': "86400"
    }
    content['rule-providers'] = ruleProviders
        // 将上述的 Global 设置为使用代理
    content['rules'].unshift("RULE-SET,Global,🔰国外流量");

    // // 导入 Unbreak 列表
    // content['rules'].unshift("RULE-SET,Global,🔰国外流量");

    // - DOMAIN-SUFFIX,duyaoss.com,🔰国外流量
    // - DOMAIN-SUFFIX,stackoverflow.com,🔰国外流量
    // - DOMAIN-SUFFIX,jenkins-ci.org,🔰国外流量
    // - DOMAIN-SUFFIX,debian.org,🔰国外流量
    // - DOMAIN-SUFFIX,docker.io,🔰国外流量
    // - DOMAIN-SUFFIX,v2ex.com,🔰国外流量


    // 导入医保内网要放开的网段
    content['rules'].unshift("IP-CIDR,172.15.0.0/16,DIRECT");
    content['rules'].unshift("IP-CIDR,168.151.0.0/16,DIRECT");
    content['rules'].unshift("IP-CIDR,168.10.0.0/16,DIRECT");
    content['rules'].unshift("IP-CIDR,168.20.0.0/16,DIRECT");
    content['rules'].unshift("IP-CIDR,168.100.0.0/16,DIRECT");

    return yaml.stringify(content)
}
