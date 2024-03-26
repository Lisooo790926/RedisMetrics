## Services

### Redis Nodes

There are six nodes defined: `redis-master-1`, `redis-master-2`, `redis-master-3`, `redis-replica-1`, `redis-replica-2`, and `redis-replica-3`. . 

Each node uses the `redis:6.0.9` image and runs the `redis-server` command with the following options:

- `--appendonly yes`: Enables the append-only file, which is a data persistence model that provides a log of write operations.
- `--cluster-enabled yes`: Enables Redis Cluster support.
- `--cluster-config-file nodes.conf`: Specifies the name of the cluster configuration file.
- `--cluster-node-timeout 5000`: Sets the node timeout to 5000 milliseconds.
- `--latency-monitor-threshold 100`: Sets the latency monitor
- `--maxmemory 100mb`: Sets max memory 
- `--maxmemory-policy allkeys-lru`: Sets eviction policy
- `--port 6379`: Sets the Redis server port to 6379.

All nodes are part of the `redis-cluster-net` network.

### Redis Exporter

Redis Exporter is a Prometheus exporter for Redis metrics. It supports multiple Redis instances and allows Prometheus to scrape metrics from the Redis servers.

In this setup, there are six Redis Exporter services defined (`redis-exporter-1` to `redis-exporter-6`), each scraping metrics from a different Redis server.

### Prometheus

Prometheus is a powerful open-source monitoring and alerting toolkit. In this setup, it's configured to scrape metrics from the Redis Exporter services.

The Prometheus service is exposed on port 9090. It uses the `prom/prometheus` image and is configured with the following command-line options:

- `--config.file=/etc/prometheus/prometheus.yml`: Specifies the location of the Prometheus configuration file.
- `--storage.tsdb.path=/prometheus`: Defines the directory where Prometheus stores its time series databases.
- `--web.enable-lifecycle`: Enables certain HTTP endpoints that allow for server lifecycle management.

### Prometheus Configurations

The section defines the job and targets that Prometheus needs to scrape data from.
- `scrape_interval: 15s`: This sets the time interval between two consecutive scrapes (data collections) from the targets. In this case, Prometheus scrapes data every 15 seconds.
- `job_name: 'redis'`: This defines a job named 'redis'. A job in Prometheus represents a collection of processes, often of the same type, that it monitors.
- `static_configs`: This section specifies the targets for the 'redis' job. Targets are the actual endpoints that Prometheus scrapes data from.
- `targets: ['redis-exporter-1:9121', 'redis-exporter-2:9121', 'redis-exporter-3:9121', 'redis-exporter-4:9121', 'redis-exporter-5:9121', 'redis-exporter-6:9121']`: This line lists the targets for the 'redis' job. Each target is a Redis exporter running on a different host (or possibly a different container or pod, depending on your setup). The number after the colon is the port on which the Redis exporter is running. Prometheus will scrape metrics from these exporters at the specified `scrape_interval`.

### Grafana

Grafana is an open-source platform for monitoring and observability. It allows you to query, visualize, alert on, and understand your metrics no matter where they are stored.
![image](https://github.com/Lisooo790926/RedisMetrics/assets/48560984/b9ab14b1-0106-4b29-a05f-9a857471c84b)
![image](https://github.com/Lisooo790926/RedisMetrics/assets/48560984/5ee49d8c-c0a9-47f9-a306-8c53308f53ec)


