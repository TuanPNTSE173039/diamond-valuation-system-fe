import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const BlogDetail = () => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" columnGap={2} mb={2}>
        <Button size="small" variant="outlined">
          Back
        </Button>
        <Box flex={1}></Box>
        <Button size="small" variant="contained" color="success">
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Delete
        </Button>
      </Stack>
      <Box position="relative" mb={4}>
        <Box
          bgcolor={"#333"}
          sx={{ opacity: 0.5 }}
          zIndex={9}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
        />
        <CardMedia
          sx={{ height: "400px" }}
          image="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/cover/cover-1.webp"
          title="green iguana"
        />
        <Typography
          position="absolute"
          bottom={40}
          left={20}
          color={"white"}
          zIndex={99}
          fontSize={40}
        >
          HỔ PHÁCH - AMBER
        </Typography>
      </Box>
      <Box width={"70%"} margin={"0 auto"}>
        <Typography mb={3} fontSize={18} fontWeight={600}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
          debitis explicabo nemo tempora veritatis. Itaque iusto laboriosam quo
          ullam veritatis.
        </Typography>
        <Typography mb={2} textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          consequatur corporis impedit minima quod reiciendis sapiente, soluta
          ullam voluptate voluptates. Aliquam amet aut doloremque enim facilis
          itaque iure, maxime, mollitia nam officia officiis quaerat quia saepe
          sapiente sunt? Commodi dolores esse fuga, impedit incidunt maxime,
          nobis nostrum quia reiciendis velit veritatis voluptatibus?
          Necessitatibus possimus praesentium quasi soluta voluptatem! Amet
          culpa, doloribus ea eius explicabo iure, numquam officiis optio
          placeat quia soluta tempore temporibus ullam unde voluptates. Ea neque
          repellat sit veritatis. Aliquid consequatur cum facere nisi nostrum
          quis. A aliquam aliquid aperiam autem corporis deserunt facilis iusto
          quaerat quasi, vel. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Eum explicabo ipsam maxime optio reprehenderit rerum
          velit veritatis! Ab aspernatur assumenda blanditiis commodi
          consequatur cumque debitis dignissimos eveniet explicabo facilis
          fugiat fugit incidunt ipsam itaque iusto magni nobis nostrum numquam
          praesentium quasi quibusdam, quisquam reiciendis rerum sed, similique
          tempora tenetur, voluptatem. Asperiores eius enim et exercitationem
          illum, laboriosam magni modi neque quod quos repellat sed totam? Ab
          adipisci aperiam asperiores consequatur consequuntur, culpa
          dignissimos distinctio doloremque ea eius iste magnam odit perferendis
          placeat quibusdam, quo repudiandae sed vero. Aliquam, aliquid beatae
          corporis delectus dolores et eum ex excepturi facere facilis illo in
          ipsa laudantium minus mollitia nostrum officiis optio quae quasi quos
          ratione recusandae repellendus ullam ut veritatis. Ad aut dolorem
          earum exercitationem expedita explicabo facere facilis incidunt
          inventore ipsum, laborum modi neque placeat quaerat, sunt totam
          veritatis. Amet delectus dolore ea enim illum maiores maxime?
          Adipisci, aliquid aut consectetur cum deserunt excepturi illo ipsum
          iusto magnam mollitia non quasi quod recusandae reiciendis repellat
          temporibus voluptates. Ad, alias assumenda, consequatur cupiditate ex
          facilis incidunt iusto pariatur quia quidem quos reprehenderit
          similique ullam? Accusamus adipisci autem beatae commodi, cumque
          cupiditate, eaque eligendi exercitationem facilis fugiat in inventore
          ipsa molestias neque nulla pariatur quaerat reiciendis sapiente, vero
          voluptate. Animi commodi consequuntur culpa debitis dolor eum facilis
          hic ipsam itaque mollitia neque officia omnis pariatur placeat
          possimus, quibusdam quidem quisquam quo saepe sed sunt suscipit ut.
          Accusantium consectetur delectus dignissimos dolorum eius explicabo
          magnam numquam perferendis, porro quia quisquam ratione recusandae rem
          rerum saepe sequi vel veniam veritatis. Corporis, fugiat, ut!
          Accusamus aliquid consequatur illo nesciunt quos sequi ullam. Amet
          aspernatur commodi dignissimos distinctio et excepturi, in iure
          officia quaerat quis quo recusandae repellendus, suscipit, tempora
          voluptates. Amet, assumenda consectetur dolor doloribus dolorum esse
          facilis ipsum iusto maxime natus, nobis numquam odio odit omnis
          perferendis perspiciatis possimus quia quisquam quod sunt tempora
          tenetur vero voluptatem? Amet animi architecto assumenda beatae
          blanditiis dignissimos, distinctio dolorem, dolores dolorum ea
          eligendi enim est facilis in incidunt ipsam itaque labore magnam
          minima odio omnis provident quibusdam ratione rerum saepe vel
          voluptate voluptatem. Ab alias aspernatur, assumenda, aut commodi
          deleniti earum eum exercitationem iusto molestiae possimus quas rem
          repudiandae sapiente sunt tempora temporibus vel voluptate. At atque
          commodi eligendi eveniet, fugiat laudantium molestiae, nostrum
          obcaecati quasi repudiandae sapiente, velit. Accusamus alias
          aspernatur aut beatae consectetur dignissimos distinctio, earum,
          explicabo fugit hic id iste iusto modi neque nulla omnis possimus
          rerum sit tempora voluptatum? Adipisci, alias consectetur dolor
          eligendi et facilis id itaque modi nobis, officia, quae quidem saepe
          tempora tempore voluptate? Accusantium assumenda aut consequuntur
          cumque dicta dolor doloremque doloribus esse et eum harum id impedit
          laudantium minima mollitia necessitatibus, nemo, neque nisi odit
          officiis quam quisquam rem repudiandae saepe sit suscipit
          voluptatibus! Accusantium aliquam aliquid aperiam, consectetur culpa
          dignissimos eos et eveniet iste iure iusto labore magnam minima natus
          non pariatur provident qui quia quibusdam quis quisquam ratione soluta
          vel vero voluptatem. Amet cumque illo iure magni, nisi odit quae quas
          quibusdam sapiente totam unde voluptas voluptates voluptatum!
        </Typography>
        <Stack direction="row" mt={3} justifyContent="space-between">
          <Typography>Published: 26 Jun 2024</Typography>
          <Typography>Resource: GIA Colored Stone Course</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogDetail;
