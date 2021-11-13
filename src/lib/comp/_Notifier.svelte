<script>
    import { Notification, notifications } from "renderless-svelte";
    import Alert from "../lib/comp/alerts/alert1.svelte";
    const d = 4000;
</script>
  
  <Notification let:payload duration={d}>
    <Alert on:close={() => notifications.pop()}>
      {payload}
    </Alert>
  </Notification>

