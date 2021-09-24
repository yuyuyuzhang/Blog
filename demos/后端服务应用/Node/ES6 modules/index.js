import dns, { Resolver } from 'dns'

// IPv4
dns.lookup('archive.org', (err, ip, family) => {
  if(err) throw err

  console.log(`ipv${family} ${ip}`) //'ipv4 31.13.66.6'
})

// IPv6
const options1 = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
}
dns.lookup('archive.org', options1, (err, ip, family) => {
  if(err) throw err

  console.log(`ipv${family} ${ip}`) //'ipv6 ::ffff:31.13.66.6'
})

