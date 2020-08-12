import Vue from "vue";
import Router from "vue-router";

import Nav1 from "@/components/Nav1";
import Nav2 from "@/components/Nav2";
import Nav3 from "@/components/Nav3";
import Nav4 from "@/components/Nav4";
import Nav5 from "@/components/Nav5";

import N1C1 from "@/components/N1C1";
import N1C4 from "@/components/N1C4";
import N1C5 from "@/components/N1C5";

import N2C1 from "@/components/N2C1";
import N2C2 from "@/components/N2C2";
import N2C3 from "@/components/N2C3";
import N2C4 from "@/components/N2C4";
import N2C5 from "@/components/N2C5";
import N2C6 from "@/components/N2C6";
import TaskPercent from "@/components/TaskPercent";
import taskRoute from "@/components/taskRoute";

import N3C1 from "@/components/N3C1";
import N3C2 from "@/components/N3C2";

import N4C1 from "@/components/N4C1";
import N4C2 from "@/components/N4C2";
import N4C3 from "@/components/N4C3";
import N4C4 from "@/components/N4C4";
import N4C5 from "@/components/N4C5";

import N5C1 from "@/components/N5C1";
import N5C2 from "@/components/N5C2";

// const Nav1 = r => require.ensure([],()=>r(require('@/components/Nav1')),'Nav1')
// const Nav2 = r => require.ensure([],()=>r(require('@/components/Nav2')),'Nav2')
// const Nav3 = r => require.ensure([],()=>r(require('@/components/Nav3')),'Nav3')
// const Nav4 = r => require.ensure([],()=>r(require('@/components/Nav4')),'Nav4')
// const Nav5 = r => require.ensure([],()=>r(require('@/components/Nav5')),'Nav5')

// const N1C1 = r => require.ensure([],()=>r(require('@/components/N1C1')),'N1C1')
// const N1C4 = r => require.ensure([],()=>r(require('@/components/N1C4')),'N1C4')
// const N1C5 = r => require.ensure([],()=>r(require('@/components/N1C5')),'N1C5')

// const N2C1 = r => require.ensure([],()=>r(require('@/components/N2C1')),'N2C1')
// const N2C2 = r => require.ensure([],()=>r(require('@/components/N2C2')),'N2C2')
// const N2C3 = r => require.ensure([],()=>r(require('@/components/N2C3')),'N2C3')
// const TaskPercent = r => require.ensure([],()=>r(require('@/components/TaskPercent')),'TaskPercent')

// const N3C1 = r => require.ensure([],()=>r(require('@/components/N3C1')),'N3C1')
// const N3C2 = r => require.ensure([],()=>r(require('@/components/N3C2')),'N3C2')

// const N4C1 = r => require.ensure([],()=>r(require('@/components/N3C2')),'N3C2')
// const N4C2 = r => require.ensure([],()=>r(require('@/components/N4C2')),'N4C2')
// const N4C3 = r => require.ensure([],()=>r(require('@/components/N4C3')),'N4C3')
// const N4C4 = r => require.ensure([],()=>r(require('@/components/N4C4')),'N4C4')
// const N4C5 = r => require.ensure([],()=>r(require('@/components/N4C5')),'N4C5')

// const N5C1 = r => require.ensure([],()=>r(require('@/components/N5C1')),'N5C1')

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/nav1/n1c4"
    },
    {
      path: "/nav1",
      component: Nav1,
      children: [
        {
          path: "n1c1",
          name: "n1c1",
          component: N1C1
        },
        {
          path: "n1c4",
          name: "n1c4",
          component: N1C4
        }
      ]
    },
    {
      path: "/nav2",
      // name: 'Nav1',
      component: Nav2,
      children: [
        {
          path: "n2c1",
          name: "n2c1",
          component: N2C1
        },
        {
          path: "n2c2",
          name: "n2c2",
          component: N2C2
        },
        {
          path: "n2c3",
          name: "n2c3",
          component: N2C3
        },
        {
          path: "n2c4",
          name: "n2c4",
          component: N2C4
        },
        {
          path: "n2c5",
          name: "n2c5",
          component: N2C5
        },
        {
          path: "n2c6",
          name: "n2c6",
          component: N2C6
        },
        {
          path: "TaskPercent",
          name: "TaskPercent",
          component: TaskPercent,
          props: true
        },
        {
          path: "taskRoute",
          name: "taskRoute",
          component: taskRoute,
          props: true
        }
      ]
    },
    {
      path: "/nav3",
      // name: 'Nav1',
      component: Nav3,
      children: [
        {
          path: "n3c1",
          name: "n3c1",
          component: N3C1
        },
        {
          path: "n3c2",
          name: "n3c2",
          component: N3C2
        },
        {
          path: "n3c3",
          name: "n3c3",
          component: N1C5
        }
      ]
    },
    {
      path: "/nav4",
      // name: 'Nav1',
      component: Nav4,
      children: [
        {
          path: "n4c1",
          name: "n4c1",
          component: N4C1
        },
        {
          path: "n4c2",
          name: "n4c2",
          component: N4C2
        },
        {
          path: "n4c3",
          name: "n4c3",
          component: N4C3
        },
        {
          path: "n4c4",
          name: "n4c4",
          component: N4C4
        },
        {
          path: "n4c5",
          name: "n4c5",
          component: N4C5
        }
      ]
    },
    {
      path: "/nav5",
      // name: 'Nav1',
      component: Nav5,
      children: [
        {
          path: "n5c1",
          name: "n5c1",
          component: N5C1
        },
        {
          path: "n5c2",
          name: "n5c2",
          component: N5C2
        }
      ]
    }
  ]
});
