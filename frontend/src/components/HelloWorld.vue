<template>

<div>
  

  <v-data-table
    :headers="headers"
    :items="patients"
    sort-by="ID"
    class="elevation-1"
    :loading = "cargando"
    loading-text="Cargando..."
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.id_de_caso"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.departamento_nom"
                      label="Ciudad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.edad"
                      label="Edad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.sexo"
                      label="Sexo"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Está seguro que quiere eliminar?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</div>



</template>

<script>
import axios from 'axios';


  export default {
    name: 'HelloWorld',

data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id_de_caso',
        },
        { text: 'Ciudad', value: 'departamento_nom' },
        { text: 'Edad', value: 'edad' },
        { text: 'Sexo', value: 'sexo' },
       
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     
      patients: [],
      editedIndex: -1,
      editedItem: {
        id_de_caso: '',
        departamento_nom: '',
        edad: '',
        sexo: '',
        
      },
      defaultItem: {
        id_de_caso: '',
        departamento_nom: '',
        edad: '',
        sexo: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo caso' : 'Editar caso'
      },
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
      this.list();
    },

    methods: {
      
      initialize (){},
      list() {
        axios.get('http://localhost:3000/patients')
        .then(response => {
          this.patients = response.data;
          this.cargando = false;
          console.log(this.patients)
        })
        .catch(error => {
          console.log(error)
          return error})
      },
     
      editItem (item) {
        this.editedIndex = item.id_de_caso;
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id_de_caso
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem.id_de_caso)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //this.desserts.splice(this.editedIndex, 1)
        axios.delete('http://localhost:3000/delete', {data:{ "id_de_caso": this.editedItem.id_de_caso}})
        .then(response => {
            console.log(response);
            this.list()
          }).catch(error => {
            console.log(error)
            return error
          })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
        axios.put("http://localhost:3000/update", {
        "id_de_caso": this.editedItem.id_de_caso,
        "departamento_nom": this.editedItem.departamento_nom,
        "Edad": this.editedItem.edad,
        "Sexo": this.editedItem.sexo
          })
          .then(response => {
            console.log(response);
            this.list()
          }).catch(error => {
            console.log(error)
            return error
          })
          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          //this.desserts.push(this.editedItem)
          axios.post("http://localhost:3000/add", {
        "id_de_caso": this.editedItem.id_de_caso,
        "departamento_nom": this.editedItem.departamento_nom,
        "edad": this.editedItem.edad,
        "sexo": this.editedItem.sexo
          })
          .then(response => {
            console.log(response);
            this.list()
          }).catch(error => {
            console.log(error)
            return error
          })
        }
        this.close()
      },
    },
    
  }
</script>
