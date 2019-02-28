<template>
  <div class="p-a-1-5">
    <!-- <v-container> -->
    <div class="">
      <h1 class="headerFont">Document</h1>


      <v-layout row wrap>
        <!-- <v-flex xs12> -->
        <v-flex xs12 sm3 md2>
          <v-subheader style="font-size: 16px"v-text="'Status Customer: '"></v-subheader>
        </v-flex>
        <v-flex xs12 sm3 md2 class="padding-status">
          <v-select v-model="states" :items="itemss" :menu-props="{ maxWight: '800' }"attach chips label="Status" multiple></v-select>
        </v-flex>

        <v-flex xs5 sm2 md2 class="margin-sotype">
          <v-subheader style="font-size: 16px"v-text="'SO Type : '"></v-subheader>
        </v-flex>
        <v-flex xs6 sm4 md2 style="margin-left: -100px">
          <v-select v-model="sotype" :items="itemsotype" :menu-props="{ maxWight: '800' }"attach chips label="SO Type" multiple></v-select>
        </v-flex>

        <v-flex xs6 pl-3 md2>
          <v-subheader style="font-size: 16px"v-text="'Service Type : '"></v-subheader>
        </v-flex>
        <v-flex xs6 md2 style="margin-left: -50px">
          <v-select v-model="servicetype" :items="itemservicetype" :menu-props="{ maxWight: '800' }"attach chips label="Service Type" multiple></v-select>
        </v-flex>
        <!-- <div v-if="userData.position === 'GROUPLEAD'"> -->
        <v-flex xs2 offset-md4 style="padding-left: 100px" pt-4 v-if="userData.position === 'GROUPLEAD'">
          <v-subheader style="font-size: 16px"v-text="'Team Sales: '"></v-subheader>
        </v-flex>
        <v-flex xs6 md2 pt-3 v-if="userData.position === 'GROUPLEAD'">
          <v-select v-model="teamsales" :items="itemteamsale" :menu-props="{ maxWight: '800' }"attach chips label="Team" multiple></v-select>
        </v-flex>

        <v-flex xs2 offset-md4 style="padding-left: 100px" pt-4 v-if="userData.position === 'TEAMLEAD'">
          <v-subheader style="font-size: 16px"v-text="'Name Sales: '"></v-subheader>
        </v-flex>
        <v-flex xs6 md2 pt-3 v-if="userData.position === 'TEAMLEAD'">
          <v-select v-model="namesales" :items="itemnamesale" :menu-props="{ maxWight: '800' }"attach chips label="Name" multiple></v-select>
        </v-flex>



        <!-- </div> -->

        <v-flex md4 v-if="userData.position === 'TEAMLEAD'"></v-flex>
        <v-flex xs2 sm2 md2 pt-3 pl-3 v-if="userData['position'] !== 'GROUPLEAD'">
          <v-menu
          :close-on-content-click="false"
          v-model="datefromSearch"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
          >
          <v-text-field
          slot="activator"
          v-model="computedDateFormattedFrom"
          label="จาก"
          persistent-hint
          prepend-icon="event"
          readonly
          ></v-text-field>
          <v-date-picker v-model="datefrom" no-title @input="datefromSearch = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs1 sm1 v-if="userData['position'] !== 'GROUPLEAD'"class="centerDiv"><v-icon>minimize</v-icon></v-flex>
      <v-flex xs2 sm2 pt-3 v-if="userData['position'] !== 'GROUPLEAD'">
        <v-menu
        :close-on-content-click="false"
        v-model="datetoSearch"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
        >
        <v-text-field
        slot="activator"
        v-model="computedDateFormattedTo"
        label="ถึง"
        persistent-hint
        prepend-icon="event"
        readonly
        ></v-text-field>
        <v-date-picker v-model="dateto" :min="datefrom" no-title @input="datetoSearch = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs1 sm1 v-if="userData['position'] !== 'GROUPLEAD'"><v-btn @click="clearData()" color="error" small flat fab style="font-size: 12px">clear</v-btn></v-flex>
    <!-- <v-flex xs1 sm1><v-btn @click="searchDate()" flat icon fab><v-icon>search</v-icon></v-btn></v-flex> -->
    <!-- </v-flex> -->
  </v-layout>

  <v-layout row wrap >
    <v-flex xs6 md2>
      <v-subheader style="font-size: 16px"v-text="'Summary : '"></v-subheader>
    </v-flex>
    <v-flex xs4 md2 class="padding-status" >
      <v-text-field class="inputTextRight" v-model="SUMtotal" readonly> </v-text-field>
    </v-flex>
    <v-flex xs2 md2>
      <v-subheader class="fontSize">Baht./Month</v-subheader>
    </v-flex>
  </v-layout>




  <v-layout row wrap v-if="userData['position'] === 'GROUPLEAD'">

    <v-flex xs3 md3 v-if="!filter">
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
    <v-flex v-if="!filter" xs7 md7></v-flex>
    <v-flex :class="filter? 'xs 12 md 12':'xs 2 md 2'" :style="filter ? 'padding-bottom: 0%; margin-left: -0.6%; padding-right: 0.6%': 'padding-bottom: 1%; display: flex;justify-content: flex-end;align-items: flex-end'">
      <v-btn color="info" style="width: 100%" @click="openFilter()"><v-icon></v-icon>ค้นหาขั้นสูง</v-btn>
    </v-flex>
    <transition name="slide-y-transition">
      <v-flex xs12 md12 v-if="filter">
        <v-layout row wrap>
          <v-flex xs12 md12 style="padding-bottom: 1%">
            <v-card style="background-color: #F5F5F5">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs10 md10>
                    <v-layout row wrap>
                      <v-flex xs12 md12><v-text-field label="Search" v-model="searchTxt" prepend-icon="search"></v-text-field></v-flex>
                      <v-flex xs5 md5>
                        <v-menu
                        :close-on-content-click="false"
                        v-model="datefromSearch"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <v-text-field
                        slot="activator"
                        v-model="computedDateFormattedFrom"
                        label="จาก"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                        clearable
                        ></v-text-field>
                        <v-date-picker v-model="datefrom" no-title @input="datefromSearch = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs2 md2 class="centerDiv"><v-icon>minimize</v-icon></v-flex>
                    <v-flex xs5 md5>
                      <v-menu
                      :close-on-content-click="false"
                      v-model="datetoSearch"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      >
                      <v-text-field
                      slot="activator"
                      v-model="computedDateFormattedTo"
                      label="ถึง"
                      persistent-hint
                      prepend-icon="event"
                      clearable
                      readonly
                      ></v-text-field>
                      <v-date-picker v-model="dateto" :min="datefrom" no-title @input="datetoSearch = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs5 sm5 md5>
                    <v-select v-if="userData['position'] === 'GROUPLEAD'"
                    :items="vpsalelist"
                    v-model="vpsale"
                    label="TeamLead"
                    item-text="fname"
                    item-value="grpID_grplineID"
                    chips
                    autocomplete
                    prepend-icon="assignment_ind"
                    >
                  </v-select>
                </v-flex>
                <v-flex xs2 sm2 md2></v-flex>
                <v-flex xs5 sm5 md5>
                  <v-select
                  :items="quarterlist"
                  v-model="quarter"
                  label="ไตรมาส"
                  chips
                  prepend-icon="bar_chart"
                  >
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2 md2>
            <v-layout row wrap>
              <v-flex xs12 md12 style="justify-content: center; padding-left: 10px">
                <!-- <v-select
                :items="yearAll"
                label="ปี"
                v-model="year"
                ></v-select> -->
              </v-flex>
              <v-flex xs12 md12 style="justify-content: center; padding-left: 10px">
                <v-select
                :items="weekYear"
                label="สัปดาห์"
                v-model="weekday"
                ></v-select>
              </v-flex>
              <v-flex xs12 md12 class="centerDiv" style="padding-left: 10px; padding-top: 10px">
                <v-btn outline color="error" @click="clearData()"><v-icon left>cancel</v-icon>CLEAR</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</v-flex>
</transition>
</v-layout>






<div v-if="userData['position'] === 'TEAMLEAD'">
  <v-layout row wrap >
    <v-flex xs4 md4 offset-md8>
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>
  <v-data-table :headers="headers" :items="filterBySearchBox" :rows-per-page-items="[{text:'All', value: -1}]" v-bind:pagination.sync="saleTeamLead" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props"> -->
    <!-- <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td class="tdListSale">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.order_status_sale }}</td>
  <td align="left">{{ props.item.order_status_presale }}</td>
  <td align="left">{{ props.item.order_status_bd }}</td>
  <td align="left">{{ priceSale(props.item.sfc_total) }}</td>
  <!-- <td align="center" v-if="props.item.state_sale === 'SALES'"><v-chip outline disabled color="warning">PENDING</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'TEAMLEAD'"><v-chip outline disabled color="success">APPROVE</v-chip></td> -->

  <!-- <td align="center" v-if="props.item.state_presale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_presale === 'APPROVE'"><v-chip outline disabled color="success">Approve</v-chip></td> -->
  <!-- <td align="center" v-else><v-chip outline disabled color="warning">PENDING</v-chip></td> -->
  <td align="center">
    <v-chip outline disabled color="warning" v-if="props.item.state_sale === 'SALES'">PENDING</v-chip>
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>

  </td>



  <td align="center">
    <v-chip outline disabled color="warning" v-if="props.item.state_presale === ''">PENDING</v-chip>
    <v-chip outline disabled color="error" v-if="props.item.state_presale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-if="props.item.state_presale === 'APPROVE'">APPROVE</v-chip>

  </td>
  <td align="center">
    <v-btn @click="editReport(props.item.id)" small flat fab><v-icon icon medium color="info">edit</v-icon></v-btn>
    <v-btn class="m-l-2" @click="check(props.item.id,1)" small flat fab color="green"><v-icon medium icon>assignment</v-icon></v-btn>
    <v-btn class="m-l-2" @click="deleteSFC(props.item.id)" small flat fab color="red"><v-icon medium icon>delete</v-icon></v-btn>

  </td>
  <!-- <td align="left">{{state_presale}}</td> -->
  <!-- <td align="center"> -->
  <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
  <!-- <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
  <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
  <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
  <!-- </td> -->
</template>
</v-data-table>
</div>





<div v-else-if="userData['position'] === 'GROUPLEAD'">
  <div v-if="filter" style="padding-top: 11%">
    <v-data-table :headers="headers" :items="filterBySearchBox" :rows-per-page-items="[{text:'All', value: -1}]" v-bind:pagination.sync="pagination" class="elevation-1">
      <!-- <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
      <span slot="activator">
      {{ props.header.text }}
    </span>
    <span>
    {{ props.header.text }}
  </span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td class="tdListSale">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.order_status_sale }}</td>
  <td align="left">{{ props.item.order_status_presale }}</td>
  <td align="left">{{ props.item.order_status_bd }}</td>
  <td align="left">{{ priceSale(props.item.sfc_total) }}</td>
  <!-- <td align="center" v-if="props.item.state_sale === 'SALES'"><v-chip outline disabled color="warning">PENDING</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'TEAMLEAD'"><v-chip outline disabled color="success">APPROVE</v-chip></td> -->

  <!-- <td align="center" v-if="props.item.state_presale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_presale === 'APPROVE'"><v-chip outline disabled color="success">Approve</v-chip></td> -->
  <!-- <td align="center" v-else><v-chip outline disabled color="warning">PENDING</v-chip></td> -->
  <td align="center">
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-else-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>
    <!-- <div v-if="userData['position'] === 'TEAMLEAD'">
    <td align="center"></td>
  </div> -->
  <v-btn round color="primary" style="width: 5px; font-size: 10px"  @click="approve(props.item.id)" v-else><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn>
  <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->

</td>



<td align="center">
  <v-chip outline disabled color="error" v-if="props.item.state_presale === 'REJECT'">REJECT</v-chip>
  <v-chip outline disabled color="success" v-else-if="props.item.state_presale === 'APPROVE'">APPROVE</v-chip>
  <v-chip outline disabled color="warning" v-else>PENDING</v-chip>

</td>
<td align="center">
  <v-btn class="m-l-2" @click="check(props.item.id,1)" small flat fab color="primary"><v-icon medium icon>assignment</v-icon></v-btn>
  <div v-if="props.item.state_sale !== 'TEAMLEAD'">
    <v-btn @click="editReport(props.item.id)" small flat fab color="error"><v-icon medium icon>edit</v-icon></v-btn>
  </div>




</td>
<!-- <td align="left">{{state_presale}}</td> -->
<!-- <td align="center"> -->
<!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
<!-- <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
<!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
<v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
<!-- </td> -->
</template>
</v-data-table>
</div>
<div v-else>
  <v-data-table :headers="headers" :items="filterBySearchBox" :rows-per-page-items="[{text:'All', value: -1}]" v-bind:pagination.sync="pagination" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td class="tdListSale">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.order_status_sale }}</td>
  <td align="left">{{ props.item.order_status_presale }}</td>
  <td align="left">{{ props.item.order_status_bd }}</td>
  <td align="left">{{ priceSale(props.item.sfc_total) }}</td>
  <!-- <td align="center" v-if="props.item.state_sale === 'SALES'"><v-chip outline disabled color="warning">PENDING</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'TEAMLEAD'"><v-chip outline disabled color="success">APPROVE</v-chip></td> -->

  <!-- <td align="center" v-if="props.item.state_presale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_presale === 'APPROVE'"><v-chip outline disabled color="success">Approve</v-chip></td> -->
  <!-- <td align="center" v-else><v-chip outline disabled color="warning">PENDING</v-chip></td> -->
  <td align="center">
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-else-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>
    <!-- <div v-if="userData['position'] === 'TEAMLEAD'">
    <td align="center"></td>
  </div> -->
  <v-btn round color="primary" style="width: 5px; font-size: 10px"  @click="approve(props.item.id)" v-else><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn>
  <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->

</td>



<td align="center">
  <v-chip outline disabled color="error" v-if="props.item.state_presale === 'REJECT'">REJECT</v-chip>
  <v-chip outline disabled color="success" v-else-if="props.item.state_presale === 'APPROVE'">APPROVE</v-chip>
  <v-chip outline disabled color="warning" v-else>PENDING</v-chip>

</td>
<td align="center">
  <v-btn class="m-l-2" @click="check(props.item.id,1)" small flat fab color="primary"><v-icon medium icon>assignment</v-icon></v-btn>
  <div v-if="props.item.state_sale !== 'TEAMLEAD'">
    <v-btn @click="editReport(props.item.id)" small flat fab color="error"><v-icon medium icon>edit</v-icon></v-btn>
    <v-btn @click="deleteSFC(props.item.id)" small flat fab color="red"><v-icon medium icon>delete</v-icon></v-btn>
  </div>



</td>
<!-- <td align="left">{{state_presale}}</td> -->
<!-- <td align="center"> -->
<!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
<!-- <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
<!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
<v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
<!-- </td> -->
</template>
</v-data-table>
</div>
</div>








<div v-else>
  <v-layout row wrap >
    <v-flex xs4 md4 offset-md8 v-if="userData['position'] !== 'GROUPLEAD'">
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>
  <v-data-table v-bind:pagination.sync="pagination" :rows-per-page-items="[{text:'All', value: -1}]" :headers="headers" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td class="tdListSale">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.order_status_sale }}</td>
  <td align="left">{{ props.item.order_status_presale }}</td>
  <td align="left">{{ props.item.order_status_bd }}</td>
  <td align="left">{{ priceSale(props.item.sfc_total) }}</td>
  <!-- <td align="center" v-if="props.item.state_sale === 'SALES'"><v-chip outline disabled color="warning">PENDING</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_sale === 'TEAMLEAD'"><v-chip outline disabled color="success">APPROVE</v-chip></td> -->

  <!-- <td align="center" v-if="props.item.state_presale === 'REJECT'"><v-chip outline disabled color="error">REJECT</v-chip></td>
  <td align="center" v-if="props.item.state_presale === 'APPROVE'"><v-chip outline disabled color="success">Approve</v-chip></td> -->
  <!-- <td align="center" v-else><v-chip outline disabled color="warning">PENDING</v-chip></td> -->
  <td align="center">
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-else-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>
    <v-chip outline disabled color="warning" v-else>PENDING</v-chip>

  </td>



  <td align="center">
    <v-chip outline disabled color="error" v-if="props.item.state_presale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-if="props.item.state_presale === 'APPROVE'">APPROVE</v-chip>
    <v-chip outline disabled color="warning" v-else>PENDING</v-chip>

  </td>
  <td align="center">
    <v-btn v-if="props.item.state_sale === 'REJECT'" @click="rejectReport(props.item.id)" small flat fab><v-icon icon medium color="info">edit</v-icon></v-btn>
    <!-- <v-btn v-if="props.item.state_sale === 'REJECT'" @click="deleteReport(props.item.id)" small flat fab><v-icon icon medium color="error">delete</v-icon></v-btn> -->
    <v-btn class="m-l-2" @click="check(props.item.id,1)" small flat fab color="primary"><v-icon medium icon>assignment</v-icon></v-btn>
    <v-btn class="m-l-2" @click="deleteSFC(props.item.id)" small flat fab color="red"><v-icon medium icon>delete</v-icon></v-btn>


  </td>
  <!-- <td align="left">{{state_presale}}</td> -->
  <!-- <td align="center"> -->
  <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
  <!-- <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
  <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
  <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn> -->
  <!-- </td> -->
</template>
</v-data-table>
</div>
</div>
<!-- </v-container> -->
</div>
</template>

<script>
import _ from 'lodash'
import { Decode, Encode } from '@/services'

import moment from 'moment'
export default {
  data () {
    return {
      pagination: {sortBy: 'apv_normal_date', descending: true},
      // saleGroupLead: {sortBy: 'vpsale_date', descending: true},
      saleTeamLead: {sortBy: 'vpsale_date', descending: true},
      listReport: [],
      searchTxt: '',
      headers: [
        { text: '#', value: 'no', sortable: false, align: 'center' },
        { text: 'Create Date', sortable: false, value: 'createDate', align: 'left' },
        { text: 'ชื่อลูกค้า', sortable: false, value: 'custname', align: 'left' },
        { text: 'ชื่อโปรเจค', sortable: false, value: 'custname', align: 'left' },
        { text: 'ชื่อ-นามสกุล Sales', sortable: false, value: 'fullNameSale', align: 'left'},
        { text: 'วันเริ่มสัญญา', sortable: false, value: 'date', align: 'left' },
        { text: 'Status Sales', sortable: false, value: 'date', align: 'left'},
        { text: 'Status Presales', sortable: false, value: 'date', align: 'left'},
        { text: 'Status BD', sortable: false, value: 'date', align: 'left'},
        { text: 'Revenue', sortable: false, value: 'date', align: 'left' },
        { text: 'ทีมSALES', sortable: false, value: 'sale', align: 'center'},
        { text: 'ทีมPRESALES', sortable: false, value: 'presale', align: 'center' },
        { text: 'ดูรายละเอียด', sortable: false, value: 'presale', align: 'center' }
      ],
      weekYear: [],
      yearAll: [],
      year: null,
      listUser: [],
      weekday: null,
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
      listReportFilterDate: [],
      listReportFilterAll: [],
      listReportFilterGroup: [],
      listReportFilterstatus: [],
      listReportSOtype: [],
      listReportServicetype: [],
      listReportnameSales: [],
      itemservicetype: [],
      servicetype: [],
      vpsale: null,
      vpsalelist: [],
      filter: false,
      quarterlist: ['Q1', 'Q2', 'Q3', 'Q4'],
      quarter: [],
      fileName: '',
      link: '',
      SUMtotal: 0,
      totalreven: 0,
      states: [],
      itemss: [],
      checkk: [],
      itemnamesale: [],
      namesales: [],
      teamsales: [],
      itemteamsale: [],
      sotype: [],
      itemsotype: [],
      totalSum: 0,
      text: ''
    }
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    filterBySearchBox () {

      // if(this.servicetype.length !== 0 ){
      //   console.log(this.servicetype[0].id)
      // }
      // console.log(this.teamsales[0].text)
      // console.log(this.states)
      var searchTxt = this.searchTxt
      if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(111)
        // this.SUMtotal = result.total[0].SUMtotalcost
        // console.log(111)
        // console.log(this.SUMtotal)
        // console.log(111)
        // this.getReportApprove()
        if(this.SUMtotal !== this.totalreven){
          this.SUMtotal = this.totalreven
          var parts = this.totalreven.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReport, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log('====222===')
        if (this.totalSum !== this.SUMtotal) {
          this.SUMtotal = this.totalSum
        }
        return _.filter(this.listReportFilterDate, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(333)
        if (this.totalSum !== this.SUMtotal) {
          this.SUMtotal = this.totalSum
        }
        return _.filter(this.listReportFilterAll, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(444)
        if (this.totalSum !== this.SUMtotal) {
          this.SUMtotal = this.totalSum
        }
        return _.filter(this.listReportFilterGroup, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }


        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportSOtype = []
        this.SUMtotal = 0

        // console.log(this.totalreven)
        // console.log(this.listReportSOtype)
        // this.getReportApprove()


        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            // console.log(this.listReport[j].so_type)
            // console.log(this.sotype[i].id)
            // console.log('====================')
            if (this.listReport[j].so_type === this.sotype[i].id.toString()) {
              // console.log(55555555555)
              this.listReportSOtype.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log('--------------------')
        // console.log(this.listReportSOtype)
        // console.log('--------------------')
        // if(this.SUMtotal !== this.totalreven){
        //   this.SUMtotal = this.totalreven
        //   var parts = this.totalreven.toString().split('.')
        //   parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        //   this.SUMtotal = parts.join('.')
        // }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(222)
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(333)
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterAll[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(444)
        console.log(333)
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterGroup[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {

        // console.log('=======================================')
        // console.log(this.listReport[3].Group_service_type.length)
        this.listReportServicetype = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReport[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReport[j].id !== sfc){
                  this.listReportServicetype.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(this.listReportFilterDate)
        console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.listReportFilterDate[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterDate[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterDate[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterDate[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterDate[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(333)
        this.listReportServicetype = []
        this.SUMtotal = 0
        // console.log(this.listReportFilterDate)
        // console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.listReportFilterAll[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterAll[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterAll[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterAll[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterAll[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(444)
        this.listReportServicetype = []
        this.SUMtotal = 0
        // console.log(this.listReportFilterDate)
        // console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.listReportFilterGroup[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterGroup[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterGroup[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterGroup[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterGroup[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0  && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0  && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0

        // console.log(this.totalreven)
        // console.log(this.listReportSOtype)
        // this.getReportApprove()


        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            // console.log(this.listReport[j].so_type)
            // console.log(this.sotype[i].id)
            // console.log('====================')
            if (this.listReport[j].so_type === this.sotype[i].id.toString()) {
              // console.log(55555555555)
              this.listReportSOtype.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(222)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(333)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterAll[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(444)
        console.log(333)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterGroup[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0 && this.namesales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      }


      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////

      else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log(111123456789)
        // this.SUMtotal = result.total[0].SUMtotalcost
        console.log(this.listReport)
        // console.log(this.SUMtotal)
        // console.log(111)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReport[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log('====222===')
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterDate[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        if (this.totalSum !== this.SUMtotal) {
          this.SUMtotal = this.totalSum
        }
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log(333)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterAll[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        // }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')

        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log(444)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterGroup[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterstatus[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterstatus[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterstatus[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterstatus[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0 && this.namesales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportFilterteam[j]['sale_ID'] === this.namesales[i].emp_no ) {
              // console.log(2222)
              this.listReportnameSales.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportSOtype = []
        this.listReportnameSales = []
        this.SUMtotal = 0

        // console.log(this.totalreven)
        // console.log(this.listReportSOtype)
        // this.getReportApprove()


        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            // console.log(this.listReport[j].so_type)
            // console.log(this.sotype[i].id)
            // console.log('====================')
            if (this.listReport[j].so_type === this.sotype[i].id.toString()) {
              // console.log(55555555555)
              this.listReportSOtype.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        console.log(222)
        this.listReportSOtype = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // if (this.totalSum !== this.SUMtotal) {
        //   this.SUMtotal = this.totalSum
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        console.log(333)
        this.listReportSOtype = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterAll[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        console.log(444)
        console.log(333)
        this.listReportSOtype = []
        this.listReportnameSales = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterGroup[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        // console.log(this.listReportFilterstatus)
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']

        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportSOtype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportSOtype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {

        // console.log('=======================================')
        // console.log(this.listReport[3].Group_service_type.length)
        this.listReportServicetype = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReport[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReport[j].id !== sfc){
                  this.listReportServicetype.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(this.listReportFilterDate)
        console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.listReportFilterDate[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterDate[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterDate[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterDate[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterDate[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        console.log(333)
        this.listReportServicetype = []
        this.SUMtotal = 0
        // console.log(this.listReportFilterDate)
        // console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.listReportFilterAll[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterAll[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterAll[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterAll[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterAll[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        console.log(444)
        this.listReportServicetype = []
        this.SUMtotal = 0
        // console.log(this.listReportFilterDate)
        // console.log('===========date=service=========')
        var sfc = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.listReportFilterGroup[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterGroup[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterGroup[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterGroup[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterGroup[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        // console.log(this.listReportFilterstatus)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0  && this.servicetype.length !== 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0  && this.servicetype.length !== 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // console.log(this.listReportFilterstatus)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0

        // console.log(this.totalreven)
        // console.log(this.listReportSOtype)
        // this.getReportApprove()


        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            // console.log(this.listReport[j].so_type)
            // console.log(this.sotype[i].id)
            // console.log('====================')
            if (this.listReport[j].so_type === this.sotype[i].id.toString()) {
              // console.log(55555555555)
              this.listReportSOtype.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        console.log(222)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        console.log(333)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterAll[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        console.log(444)
        console.log(333)
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterGroup[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(555)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        console.log(666)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterDate[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        console.log(777)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(888)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(999)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['nameGroupline'] === this.teamsales[i].text ) {
              console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111000)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterDate[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111222)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterAll[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        console.log(1113333)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterGroup[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111444)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
              this.check[i] = 1
            } else {

            }
          }
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        // console.log(this.listReportFilterstatus)
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale === null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111555)
        for (var j = 0; j < this.listReportFilterDate.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterDate[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterDate[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.vpsale !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportFilterteam = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111666)
        for (var j = 0; j < this.listReportFilterAll.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterAll[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterAll[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.vpsale !== null && (this.datefrom === null || this.dateto === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.listReportServicetype = []
        this.SUMtotal = 0
        console.log(111777)
        for (var j = 0; j < this.listReportFilterGroup.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilterGroup[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilterGroup[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['nameGroupline'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j].so_type === this.sotype[i].id.toString()) {
              this.listReportSOtype.push(this.listReportFilterteam[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        this.listReportnameSales = []
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.namesales.length; i++) {
            if (this.listReportServicetype[j]['sale_ID'] === this.namesales[i].emp_no ) {
              this.listReportnameSales.push(this.listReportServicetype[j])
              this.check[i] = 1
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportnameSales.length; i++) {
          this.SUMtotal += this.listReportnameSales[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportnameSales, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1
        })
      }



    },
    computedDateFormattedFrom () {
      return this.datefrom
    },
    computedDateFormattedTo () {
      return this.dateto
    }
  },
  created () {
    this.getNamesales ()
    this.getReportApprove()
    this.getstatus()
    this.getTeamsales()
    this.getSOtype()
    this.getServicetype()
    if (this.userData['position'] === 'GROUPLEAD' ) {
      this.getVPList()
      this.getWeek()
      this.getYear()
      // || this.userData['position'] === 'TEAMLEAD'
    }
    // console.log(this.userData['position'])
  },
  watch: {
    // SUMtotal (val) {
    // var parts = val.toString().split('.')
    // parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // this.SUMtotal = parts.join('.')
    // },


    dateto () {
      this.SUMtotal = 0
      this.listReportFilterDate = []
      this.listReportFilterAll = []
      this.listReportFilterGroup = []
      this.listReportFilterstatus = []
      // console.log(444444)
      // if (this.states.length !== 0)
      if (this.datefrom !== null && this.dateto !== null && this.vpsale === null && this.states.length === 0) {
        // console.log(3333333)
        for (var i = 0; i < this.listReport.length; i++) {
          if (this.listReport[i]['date_proceed'] >= this.datefrom && this.listReport[i]['date_proceed'] <= this.dateto) {
            this.listReportFilterDate.push(this.listReport[i])
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterDate.length; i++) {
          this.SUMtotal += this.listReportFilterDate[i]['sfc_total']
          this.totalSum += this.listReportFilterDate[i]['sfc_total']
        }
        // console.log(1111111)
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')

        var parts = this.totalSum.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.totalSum = this.SUMtotal
      } else if (this.datefrom !== null && this.dateto !== null && this.vpsale !== null && this.states.length === 0) {


        // console.log('date')
        if (this.listReportFilterGroup.length === 0) {
          for (var j = 0; j < this.listReport.length; j++) {
            if (this.listReport[j]['group_id'] === parseInt(this.vpsale.split(',')[1])) {
              this.listReportFilterGroup.push(this.listReport[j])
            }
          }
        }
        for (var k = 0; k < this.listReportFilterGroup.length; k++) {
          if (this.listReportFilterGroup[k]['date_proceed'] >= this.datefrom && this.listReportFilterGroup[k]['date_proceed'] <= this.dateto) {
            this.listReportFilterAll.push(this.listReportFilterGroup[k])
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterAll.length; i++) {
          this.SUMtotal += this.listReportFilterAll[i]['sfc_total']
          this.totalSum += this.listReportFilterAll[i]['sfc_total']
        }

        console.log(222222222)
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        this.totalSum = this.SUMtotal



      } else if (this.states.length !== 0) {
        // var parts = this.SUMtotal.toString().split('.')
        // parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        // this.SUMtotal = parts.join('.')

      }
    },
    quarter () {
      if (this.quarter === 'Q1') {
        if (this.weekday !== null) {
          this.weekday = null
        }
        this.listReportFilterDate = []
        this.datefrom = moment().quarter(1).startOf('quarter').set('year', this.year).format('YYYY-MM-DD')
        this.dateto = moment().quarter(1).endOf('quarter').set('year', this.year).format('YYYY-MM-DD')
      } else if (this.quarter === 'Q2') {
        if (this.weekday !== null) {
          this.weekday = null
        }
        this.listReportFilterDate = []
        this.datefrom = moment().quarter(2).startOf('quarter').set('year', this.year).format('YYYY-MM-DD')
        this.dateto = moment().quarter(2).endOf('quarter').set('year', this.year).format('YYYY-MM-DD')
      } else if (this.quarter === 'Q3') {
        if (this.weekday !== null) {
          this.weekday = null
        }
        this.listReportFilterDate = []
        this.datefrom = moment().quarter(3).startOf('quarter').set('year', this.year).format('YYYY-MM-DD')
        this.dateto = moment().quarter(3).endOf('quarter').set('year', this.year).format('YYYY-MM-DD')
      } else if (this.quarter === 'Q4') {
        if (this.weekday !== null) {
          this.weekday = null
        }
        this.listReportFilterDate = []
        this.datefrom = moment().quarter(4).startOf('quarter').set('year', this.year).format('YYYY-MM-DD')
        this.dateto = moment().quarter(4).endOf('quarter').set('year', this.year).format('YYYY-MM-DD')
      }
    },
    vpsale () {
      if (this.vpsale !== null && (this.dateto === null || this.datefrom === null)) {
        if (this.userData['position'] === 'GROUPLEAD') {
          // console.log(7894561230)
          this.listReportFilterGroup = []
          for (var i = 0; i < this.listReport.length; i++) {
            if (this.listReport[i]['group_id'] === parseInt(this.vpsale.split(',')[1])) {
              this.listReportFilterGroup.push(this.listReport[i])
            }
          }
          this.SUMtotal = 0
          for (var i = 0; i < this.listReportFilterGroup.length; i++) {
            this.SUMtotal += this.listReportFilterGroup[i]['sfc_total']
            this.totalSum += this.listReportFilterGroup[i]['sfc_total']
          }


          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
          this.totalSum = this.SUMtotal

          // console.log(this.totalSum)
          console.log(this.SUMtotal)


        }
      } else if (this.vpsale !== null && this.dateto !== null && this.datefrom !== null) {
        if (this.userData['position'] === 'GROUPLEAD') {
          this.listReportFilterAll = []
          if (this.listReportFilterDate.length === 0) {
            for (var l = 0; l < this.listReport.length; l++) {
              if (this.listReport[l]['date_proceed'] >= this.datefrom && this.listReport[l]['date_proceed'] <= this.dateto) {
                this.listReportFilterDate.push(this.listReport[l])
              }
            }
          }
          for (var m = 0; m < this.listReportFilterDate.length; m++) {
            if (this.listReportFilterDate[m]['group_id'] === parseInt(this.vpsale.split(',')[1])) {
              this.listReportFilterAll.push(this.listReportFilterDate[m])
            }
          }
          this.SUMtotal = 0
          for (var i = 0; i < this.listReportFilterAll.length; i++) {
            this.SUMtotal += this.listReportFilterAll[i]['sfc_total']
            this.totalSum += this.listReportFilterAll[i]['sfc_total']
          }

          console.log(222222222)
          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
          this.totalSum = this.SUMtotal

        }
      }
    },
    weekday () {
      if (this.weekday !== null) {
        if (this.quarter !== null) {
          this.quarter = null
        }
        this.listReportFilterDate = []
        this.datefrom = moment().week(this.weekday).weekday(1).set('year', this.year).format('YYYY-MM-DD')
        this.dateto = moment().week(this.weekday).weekday(7).set('year', this.year).format('YYYY-MM-DD')
      }
    }
  },
  methods: {
    editReport (val) {
      this.$emit('editSaleforecast', val)
    },
    rejectReport (val) {
      this.$emit('rejectSaleforecast', val)
    },
    priceSale (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    deleteSFC (val) {
      console.log(val)
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ Delete ข้อมูล',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({id_sfc: val}))
          this.axios.post(process.env.API + '/deleteSFC_All', {source: source}).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            if (result.status === 'success') {
              this.$swal('ลบเรียบร้อยแล้ว', '', 'success')
              this.getReportApprove()
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    getReportApprove () {
      var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getReportApprove', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
          console.log(this.listReport)
          for (var i = 0; i < this.listReport.length; i++) {
          }
          for (var i = 0; i < this.listReport.length; i++) {
            // this.SUMtotal += this.listReport[i].sfc_total

            if (this.listReport[i].project_name === null){
              this.listReport[i].project_name = '-'
            }
            if (this.listReport[i].order_status_bd !== null) {
              this.listReport[i].order_status_bd = this.listReport[i].order_status_bd.split(',')
              var unique = this.uniqueArray2(this.listReport[i].order_status_bd)
              this.listReport[i].order_status_bd = unique
            }
            var statusBD = ''
            for (var j = 0; j < unique.length; j++) {
              if (this.listReport[i].order_status_bd[j] !== '') {
                if (statusBD !== '') {
                  statusBD += ', '
                }
                statusBD += this.listReport[i].order_status_bd[j]
              }
            }
            this.listReport[i].order_status_bd = statusBD
            if (this.listReport[i].Group_service_type > 0) {
              this.listReport[i].Group_service_type = this.listReport[i].Group_service_type.split(',')
            }
          }
          this.totalreven = this.SUMtotal
          // console.log(this.listReport)
          if(result.total[0].SUMtotalcost !== 0){
            // console.log('/////////////////////////////////')
            this.SUMtotal = result.total[0].SUMtotalcost
            this.totalreven = result.total[0].SUMtotalcost
            var parts = this.SUMtotal.toString().split('.')
            parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.SUMtotal = parts.join('.')
          }else {
            this.SUMtotal = 0
          }
          // console.log('/////////////////////////////////')
          // console.log(this.SUMtotal)
          // console.log('/////////////////////////////////')

        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    uniqueArray2 (arr) {
      var a = []
      for (var i=0, l=arr.length; i<l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
      a.push(arr[i])
      return a
    },
    // editReport (val) {
    //   this.$emit('editSaleforecast', val)
    // },
    approve (val) {
      var me = this
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ Approve ข้อมูล',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {

          // this.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
          // console.log(this.userData['emp_no'])
          // console.log(this.$route.query.idsaleforecast)
          // console.log(this.remark)
          var source = Encode.encode(JSON.stringify({id: val, apvid: this.userData['emp_no'], position: "TEAMLEAD", remark: '-'}))
          this.axios.post(process.env.API + '/approve', {source: source}).then((response) => {
            if (response.data === 'success') {

              this.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
              this.getReportApprove()
              this.getstatus ()
              // this.$router.push('/sale/request')
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    editReport (val) {
      this.$emit('editSaleforecast', val)
    },
    getstatus () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getstatusSBP', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemss.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
          // this.items = result.data
          // console.log(this.items)
          // console.log(this.listReport)
          // console.log(this.listReport)
          // if(result.total[0].SUMtotalcost !== 0){
          //   this.SUMtotal = result.total[0].SUMtotalcost
          // }else {
          //   this.SUMtotal = 0
          // }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getNamesales () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getNameSales', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemnamesale.push({ id: result.data[i].id , text: result.data[i].name , emp_no: result.data[i].emp_no})
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getTeamsales () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getTeamSales', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemteamsale.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getSOtype () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getSOtype', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemsotype.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getServicetype () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getServicetype', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemservicetype.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    clearData(){
      this.dateto = null
      this.datefrom = null
      this.vpsale = null
      this.quarter = []
      this.searchTxt = ''
      this.listReportFilter = []
      this.weekday = null
      this.states = []
      this.year = moment().get('year')
      this.servicetype = []
      this.sotype = []
      this.teamsales = []

    },
    openFilter () {
      this.filter = !this.filter
    },
    getVPList () {
      var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getVPGroupSale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.vpsalelist = result.data
          for (var i = 0; i < this.vpsalelist.length; i++) {
            this.vpsalelist[i]['grpID_grplineID'] = this.vpsalelist[i]['id'] + ',' + this.vpsalelist[i]['group_id'] + ',' + this.vpsalelist[i]['groupline_id']
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    searchData () {
      var source = Encode.encode(JSON.stringify({vpsaleid: this.vpsale, id: this.userData['emp_no']}))
      this.axios.post(process.env.API + '/searchSaleforecast', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.searchReport = result.data
        } else {
          this.$swal('ไม่มีข้อมูล', '', 'error')
        }
      })
    },
    formatDate (datetime) {
      // var date = new Date(datetime)
      var date = new Date(datetime.replace(/\s/, 'T'))
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var year = date.getFullYear()
      if (datetime === '' || datetime === null) {
        return ''
      } else {
        return day + '/' + month + '/' + year
      }
    },
    getWeek () {
      for (var i = 1; i <= moment().weeksInYear(); i++) {
        this.weekYear.push(i)
      }
    },
    getYear () {
      for (var i = moment().get('year') - 10; i <= moment().get('year'); i++) {
        this.yearAll.push(i)
      }
      this.year = moment().get('year')
    },
    check (id,po) {
      // console.log(po)
      // console.log(id)
      this.$router.push({ path: '/viewDetailReport', 'query': { 'idsaleforecast': Encode.encode(id), 'pf': Encode.encode('approve') , 'po': Encode.encode(po), 'checkreject': Encode.encode('35') } })
    },
    generate () {
      var source = Encode.encode(JSON.stringify({year: '2030'}))
      this.axios.post(process.env.API + '/genWeeklyReport', {source: source}).then((response) => {
        // console.log(response)
        // this.downloadFile(response.data.fileName)
      })
    },
    deleteReport (id) {
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ ลบ REPORT นี้ใช่ไหม',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({'id': this.userData['emp_no'], 'idsaleforecast': id}))
          this.axios.post(process.env.API + '/deleteSaleforecast', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ทำการลบReportสำเร็จ', '', 'success')
              this.getReportApprove()
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    }
  }
}
</script>
<style media="screen" scoped="">
/* @media only screen and (max-width: 823px) { */
  .margin-sotype {
    margin-left: 140px !important;
  }
/* } */
/* @media only screen and (min-width: 812px) {
  .margin-sotype {
    margin-left: 40px !important;
  }
} */
.layout.wrap {
  height: 50px !important;
}
>>>.input-group__details {
  min-height: 0px !important;
}
>>>.input-group {
  padding: 0px;
}
>>>.input-group--text-field label {
  top: 0px;
}
.card__text {
  height: 148px;
}
.thListSale {
  padding: 0 30px 0 12px !important;
}
.thListCusName {
  padding: 0 12px 0 12px !important;
}
.thListNameSale {
  padding: 0 30px 0 22px !important;
}
>>>table.table thead th:not(:first-child) {
  padding: 0 0px;
}
.subheader {
  height: 21px !important;
}
>>>.list__tile__action, .list__tile__avatar {
  min-width: 40px !important;
}
.padding-status {
  margin-left: -40px !important;
}
</style>
